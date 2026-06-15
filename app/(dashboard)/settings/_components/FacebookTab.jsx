"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Save, ExternalLink, Globe, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

export function FacebookTab() {
  const { getToken } = useAuth();
  
  const [form, setForm] = useState({ name: "", accessToken: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/facebook-setting", { method: "GET" }, getToken);
        if (res.data) {
          setForm({
            name: res.data.name || "",
            accessToken: res.data.accessToken || "",
          });
        }
      } catch (err) {
        if (err.message && !err.message.includes("404")) {
          setMessage({ type: "error", text: "Error fetching settings: " + err.message });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [getToken]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await apiFetch(
        "/facebook-setting",
        {
          method: "POST",
          body: JSON.stringify({
            accessToken: form.accessToken,
          }),
        },
        getToken
      );
      if (res.data) {
        setForm({
          name: res.data.name || "",
          accessToken: res.data.accessToken || "",
        });
        setMessage({ type: "success", text: `Facebook settings saved! Connected to: ${res.data.name}` });
      } else {
        setMessage({ type: "success", text: "Facebook settings saved successfully!" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">Facebook Integration</h3>
        <p className="text-sm text-slate-400 mt-1">
          Connect your Facebook page to allow automated publishing and insights.
        </p>
      </div>

      <div className="bg-[#151c2c] p-4 rounded-xl border border-[#1f293d] space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-slate-200">How to get your token</h4>
          <a
            href="https://graph.facebook.com/me/accounts?access_token="
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            Query /me/accounts
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <p className="text-xs text-slate-400">
          You will need a long-lived access token. Use it to query your accounts and then paste the page token below.
        </p>
      </div>

      <div className="space-y-4">
        {form.name && (
          <div className="space-y-1.5">
            <Label className="text-slate-300">Connected Page</Label>
            <div className="flex items-center justify-between p-4 bg-[#151c2c] border border-blue-500/30 rounded-xl transition-all hover:border-blue-500/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 shadow-inner">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{form.name}</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="h-3 w-3" /> Active Connection
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <Label className="text-slate-300">Page Access Token</Label>
          <Input
            name="accessToken"
            type="password"
            value={form.accessToken}
            onChange={handleChange}
            placeholder="Paste your page access token here"
            className="bg-[#0e131f] border-[#1f293d] text-slate-200 placeholder:text-slate-500/70 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 font-mono"
          />
        </div>
      </div>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-xl text-sm border ${
            message.type === "error"
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving || !form.accessToken}
          className="bg-blue-600 hover:bg-blue-500 text-white gap-2"
        >
          {saving ? (
            <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Settings
        </Button>
      </div>
    </div>
  );
}
