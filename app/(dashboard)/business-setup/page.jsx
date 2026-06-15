"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MagicContextGenerator } from "./_components/MagicContextGenerator";
import { BrandAssetsSection } from "./_components/BrandAssetsSection";
import { InspirationsSection } from "./_components/InspirationsSection";
import { UnsavedChangesBar } from "./_components/UnsavedChangesBar";
import { apiFetch } from "@/lib/api";

// ── Form shape that mirrors the backend model ──────────────────────────────
const EMPTY_FORM = {
  brandName: "",
  businessContact: "",
  logoUploaded: false,
  logoFileName: "",
  logoUrl: "",
  extractedDescription: "",
  extractedTone: "",
  extractedAudience: "",
};

export default function BusinessSetupPage() {
  const { getToken } = useAuth();

  const [form, setForm] = useState(EMPTY_FORM);
  const [savedForm, setSavedForm] = useState(EMPTY_FORM); // tracks last persisted state
  const [inspirations, setInspirations] = useState([null, null, null]);
  const [savedInspirations, setSavedInspirations] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [error, setError] = useState(null);

  // Magic Generator
  const [generating, setGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  // Accordion open/close
  const [brandOpen, setBrandOpen] = useState(true);
  const [inspOpen, setInspOpen] = useState(false);

  // ── Load business profile on mount ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/business", { method: "GET" }, getToken);
        const b = res.data;
        console.log(res)
        const loaded = {
          brandName: b.brandName || "",
          businessContact: b.businessContact || "",
          logoUploaded: !!b.logo,
          logoFileName: b.logo ? b.logo.split("/").pop() : "",
          logoUrl: b.logo || "",
          extractedDescription: b.businessDescription || "",
          extractedTone: b.brandVoice || "",
          extractedAudience: b.targetAudience || "",
        };
        setForm(loaded);
        setSavedForm(loaded);

        const loadedInspirations = [null, null, null];
        if (b.designInspirations && Array.isArray(b.designInspirations)) {
          b.designInspirations.forEach((url, i) => {
            if (i < 3 && url) {
              loadedInspirations[i] = {
                url,
                name: url.split("/").pop(),
              };
            }
          });
        }
        setInspirations(loadedInspirations);
        setSavedInspirations(loadedInspirations);
      } catch (err) {
        setError("Error fetching business profile:" + " " + err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [getToken]);

  // Detect unsaved changes
  const hasChanges =
    JSON.stringify(form) !== JSON.stringify(savedForm) ||
    inspirations.some((item, i) => {
      const saved = savedInspirations[i];
      if (!item && !saved) return false;
      if (!item || !saved) return true;
      return item.url !== saved.url || item.file !== saved.file;
    });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // ── Logo upload ─────────────────────────────────────────────────────────
  const handleLogoFileSelect = useCallback(async (file) => {
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      const res = await apiFetch(
        "/business/logo",
        { method: "POST", body: formData },
        getToken
      );
      const logoUrl = res.data?.logo || "";
      setForm((prev) => ({
        ...prev,
        logoUploaded: true,
        logoFileName: file.name,
        logoUrl,
      }));
      setSavedForm((prev) => ({
        ...prev,
        logoUploaded: true,
        logoFileName: file.name,
        logoUrl,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLogoUploading(false);
    }
  }, [getToken]);

  // ── Inspiration upload handlers ─────────────────────────────────────────
  const handleInspirationFile = useCallback((index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setInspirations((prev) => {
        const next = [...prev];
        next[index] = {
          url: reader.result, // Local data URL preview
          name: file.name,
          file,               // Hold file for uploading on save
        };
        return next;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleInspirationRemove = useCallback((index) => {
    setInspirations((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  // ── Save text fields & inspirations ──────────────────────────────────────
  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      // 1. Upload any inspirations that have a local file
      const updatedInspirations = await Promise.all(
        inspirations.map(async (item) => {
          if (!item) return null;
          if (item.file) {
            const formData = new FormData();
            formData.append("inspiration", item.file);
            const res = await apiFetch(
              "/business/inspiration",
              { method: "POST", body: formData },
              getToken
            );
            return {
              url: res.data.url,
              name: item.name,
            };
          }
          return item; // Keep existing
        })
      );

      const designInspirationsUrls = updatedInspirations
        .filter((item) => item !== null)
        .map((item) => item.url);

      // 2. Save business profile
      await apiFetch(
        "/business",
        {
          method: "PUT",
          body: JSON.stringify({
            brandName: form.brandName,
            businessDescription: form.extractedDescription,
            businessContact: form.businessContact,
            brandVoice: form.extractedTone,
            targetAudience: form.extractedAudience,
            designInspirations: designInspirationsUrls,
          }),
        },
        getToken
      );

      setInspirations(updatedInspirations);
      setSavedInspirations(updatedInspirations);
      setSavedForm(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleDiscard() {
    setForm(savedForm);
    setInspirations(savedInspirations);
    setGeneratedData(null);
  }

  // ── Magic Context Generator ─────────────────────────────────────────────
  // Uses a prompt field stored in a local (non-persisted) state
  const [promptValue, setPromptValue] = useState("");

  function handlePromptChange(e) {
    setPromptValue(e.target.value);
  }

  async function handleGenerate() {
    if (!promptValue.trim()) return;
    setGenerating(true);
    setGeneratedData(null);
    setError(null);

    try {
      const res = await apiFetch(
        "/business/generate-persona",
        {
          method: "POST",
          body: JSON.stringify({ prompt: promptValue }),
        },
        getToken
      );
      
      setGeneratedData({
        description: res.data.description,
        tone: res.data.tone,
        audience: res.data.audience,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to generate persona: " + err.message);
    } finally {
      setGenerating(false);
    }
  }

  function handleApplySuggestions() {
    if (!generatedData) return;
    setForm((prev) => ({
      ...prev,
      extractedDescription: generatedData.description,
      extractedTone: generatedData.tone.join(", "),
      extractedAudience: generatedData.audience.join(", "),
    }));
    setPromptValue("");
    setGeneratedData(null);
  }

  function handleDiscardSuggestions() {
    setGeneratedData(null);
  }

  // ── Render ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-4 pb-32">
      <PageHeader
        title="Business Setup"
        description="Configure your brand identity and AI context to power your marketing operations."
      />

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}


      {/* ── Magic Context Generator ──────────────────────────────────────── */}
      <MagicContextGenerator
        value={promptValue}
        onChange={handlePromptChange}
        onSubmit={handleGenerate}
        loading={generating}
        generatedData={generatedData}
        onApply={handleApplySuggestions}
        onDiscard={handleDiscardSuggestions}
        currentContext={{
          description: form.extractedDescription,
          tone: form.extractedTone,
          audience: form.extractedAudience,
        }}
      />

      {/* ── Brand Assets ─────────────────────────────────────────────────── */}
      <BrandAssetsSection
        form={form}
        handleChange={handleChange}
        onLogoFileSelect={handleLogoFileSelect}
        logoUploading={logoUploading}
        brandOpen={brandOpen}
        setBrandOpen={setBrandOpen}
      />

      {/* ── Design Inspirations ─────────────────────────────────────────── */}
      <InspirationsSection
        inspirations={inspirations}
        inspirationCount={inspirations.filter((item) => item !== null).length}
        handleInspirationFile={handleInspirationFile}
        handleInspirationRemove={handleInspirationRemove}
        inspOpen={inspOpen}
        setInspOpen={setInspOpen}
      />



      {/* ── Unsaved changes bar ──────────────────────────────────────────── */}
      {hasChanges && (
        <UnsavedChangesBar
          saving={saving}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      )}
    </div>
  );
}
