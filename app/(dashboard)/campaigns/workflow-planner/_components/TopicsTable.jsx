"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Filter, Trash2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export function TopicsTable({ topics = [], onDelete }) {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = topics.filter(
    (t) =>
      t.topic?.toLowerCase().includes(filter.toLowerCase()) ||
      t.goal?.toLowerCase().includes(filter.toLowerCase()) ||
      t.tone?.toLowerCase().includes(filter.toLowerCase())
  );

  const allSelected = filtered.length > 0 && selected.length === filtered.length;


  function toggleAll() {
    setSelected(allSelected ? [] : filtered.map((t) => t._id));
  }

  function toggleRow(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <div className="border border-[#1f293d] rounded-2xl bg-[#0b0f19] overflow-hidden">
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="p-4 border-b border-[#1f293d] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#131926]">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-white text-sm">Generated Topics</h3>
          <Badge
            variant="secondary"
            className="bg-slate-800 text-slate-300 border-0 text-xs font-semibold"
          >
            {filtered.length} Items
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            <Input
              placeholder="Filter topics..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-8 h-8 w-56 bg-[#0b0f19] border-[#1f293d] text-sm text-white placeholder:text-slate-600 focus-visible:ring-purple-500/30"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-[#1f293d] bg-[#0b0f19] text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-[#1f293d] hover:bg-transparent bg-[#131926]/50">
              <TableHead className="w-12 text-center px-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="rounded border-slate-700 bg-[#0b0f19] accent-purple-500"
                />
              </TableHead>
              <TableHead className="text-slate-400 text-xs uppercase font-semibold tracking-wider">
                Topic
              </TableHead>
              <TableHead className="text-slate-400 text-xs uppercase font-semibold tracking-wider">
                Tone
              </TableHead>
              <TableHead className="text-slate-400 text-xs uppercase font-semibold tracking-wider">
                Goal
              </TableHead>

              <TableHead className="text-slate-400 text-xs uppercase font-semibold tracking-wider text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics.length === 0 ? (
              <TableRow className="border-[#1f293d]">
                <TableCell colSpan={5} className="text-center text-slate-500 py-16 text-sm">
                  <p className="font-medium text-slate-400">No topics yet</p>
                  <p className="text-xs mt-1">Describe your campaign goal above and generate topics to get started.</p>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow className="border-[#1f293d]">
                <TableCell colSpan={5} className="text-center text-slate-500 py-12 text-sm">
                  No topics match your filter.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((topic) => (
                <TableRow
                  key={topic._id}
                  className="border-[#1f293d] hover:bg-[#131926] transition-colors"
                  data-state={selected.includes(topic._id) ? "selected" : undefined}
                >
                  <TableCell className="text-center px-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(topic._id)}
                      onChange={() => toggleRow(topic._id)}
                      className="rounded border-slate-700 bg-[#0b0f19] accent-purple-500"
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/campaigns/workflow-planner/${topic._id}`}
                      className="font-semibold text-white text-sm hover:text-purple-400 transition-colors"
                    >
                      {topic.topic}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-purple-300 bg-purple-500/10 border-purple-500/20 text-[10px] font-semibold"
                    >
                      {topic.tone}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-slate-300 text-xs">{topic.goal}</p>
                  </TableCell>

                  <TableCell className="text-center">
                    <button
                      onClick={() => onDelete?.(topic._id)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                      title="Delete topic"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      {topics.length > 0 && (
        <div className="p-4 bg-[#131926] border-t border-[#1f293d] flex items-center justify-between text-sm text-slate-400">
          <p>
            {selected.length > 0
              ? `${selected.length} selected`
              : `${filtered.length} of ${topics.length} topics`}
          </p>
          {selected.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={() => {
                selected.forEach((id) => onDelete?.(id));
                setSelected([]);
              }}
            >
              <Trash2 className="h-3 w-3 mr-1" /> Delete selected
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
