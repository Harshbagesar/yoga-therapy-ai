"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { EDUCATIONAL_ARTICLES, Article } from "@/data/yoga-db";
import { Search, Clock, ArrowLeft, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getTranslatedArticle } from "@/lib/getTranslatedData";

const formatInlineMarkdown = (text: string): string => {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-emerald-300">$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-emerald-100">$1</em>');
  return formatted;
};

const renderFormattedContent = (content: string): React.ReactNode[] => {
  const lines = content.split("\n");
  let inList = false;
  let inTable = false;
  const renderedElements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  let currentTableRows: string[][] = [];

  const flushList = (key: string) => {
    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="list-disc list-inside pl-4 space-y-1.5 my-3 text-slate-300">
          {currentListItems}
        </ul>
      );
      currentListItems = [];
      inList = false;
    }
  };

  const flushTable = (key: string) => {
    if (currentTableRows.length > 0) {
      const headers = currentTableRows[0];
      const bodyRows = currentTableRows.slice(1);
      renderedElements.push(
        <div key={`table-${key}`} className="overflow-x-auto my-6 rounded-xl border border-white/10 bg-slate-950/40 backdrop-blur-sm">
          <table className="min-w-full divide-y divide-white/10 text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-white font-semibold text-xs tracking-wider">
              <tr>
                {headers.map((h, idx) => (
                  <th key={idx} className="px-4 py-3 border-r border-white/5 last:border-0 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bodyRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors odd:bg-slate-900/20">
                  {row.map((cell, cidx) => (
                    <td key={cidx} className="px-4 py-2.5 border-r border-white/5 last:border-0 align-top" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Table row starts with "|"
    if (trimmedLine.startsWith("|")) {
      // If we were in a list, flush it
      if (inList) {
        flushList(String(index));
      }
      
      inTable = true;
      const cells = trimmedLine
        .split("|")
        .map(c => c.trim())
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      const isSeparator = cells.every(cell => /^:?-+:?$/.test(cell));
      if (!isSeparator) {
        currentTableRows.push(cells);
      }
      return;
    }

    // If we were in a table and this is not a table row, flush the table
    if (inTable) {
      flushTable(String(index));
    }

    // Empty line
    if (!trimmedLine) {
      if (inList) {
        flushList(String(index));
      }
      renderedElements.push(<div key={`space-${index}`} className="h-2" />);
      return;
    }

    // List item starts with "- " or "* "
    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      inList = true;
      const cleanText = trimmedLine.substring(2);
      currentListItems.push(
        <li key={`li-${index}`} className="my-1 text-slate-300" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleanText) }} />
      );
      return;
    }

    // If it was a list and now it is a normal line, flush the list
    if (inList) {
      flushList(String(index));
    }

    // Heading like **Heading** on its own line
    if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**") && trimmedLine.length > 4) {
      const headingText = trimmedLine.slice(2, -2);
      renderedElements.push(
        <h3 key={`h3-${index}`} className="text-base font-bold text-white mt-6 mb-2 tracking-wide">
          {headingText}
        </h3>
      );
      return;
    }

    // Normal paragraph
    renderedElements.push(
      <p key={`p-${index}`} className="text-slate-300 leading-relaxed my-2" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmedLine) }} />
    );
  });

  // Flush any remaining list or table at the end
  if (inList) {
    flushList("end");
  }
  if (inTable) {
    flushTable("end");
  }

  return renderedElements;
};

export const EducationalSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Custom articles state loaded on client to prevent hydration issues
  const [customArticles, setCustomArticles] = useState<Article[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("custom_articles");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Science");
  const [newReadTime, setNewReadTime] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedArticle]);

  // Get unique categories
  const categories = ["All", "Science", "Philosophy", "History", "Lifestyle"];

  const allArticles = [...EDUCATIONAL_ARTICLES, ...customArticles];
  const translatedArticles = allArticles.map(art => getTranslatedArticle(art, language));

  const filteredArticles = translatedArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim() || !newContent.trim()) {
      setFormError("Please fill in the title, summary, and content fields.");
      return;
    }

    const newArt: Article = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      readTime: newReadTime.trim() || "3 min read",
      summary: newSummary.trim(),
      content: newContent.trim(),
    };

    const updated = [newArt, ...customArticles];
    setCustomArticles(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("custom_articles", JSON.stringify(updated));
    }

    // Reset fields
    setNewTitle("");
    setNewCategory("Science");
    setNewReadTime("");
    setNewSummary("");
    setNewContent("");
    setFormError("");
    setShowAddModal(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                  {t.eduCenterTitle}
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  {t.eduCenterSubtitle}
                </p>
              </div>

              {/* Search Bar & Add Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute top-3 left-3.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-4.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Plus className="h-4.5 w-4.5" />
                  <span>{t.btnAddArticle}</span>
                </button>
              </div>
            </div>

            {/* Categories Toggles */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4.5 py-2 text-xs font-bold tracking-wide transition-all border ${
                    selectedCategory === cat
                      ? "bg-emerald-500 border-transparent text-white shadow-md shadow-emerald-500/10"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xxs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                      <span>{article.category}</span>
                      <span className="flex items-center text-slate-500 normal-case font-normal">
                        <Clock className="h-3 w-3 mr-1" /> {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    
                    <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xxs font-bold uppercase tracking-wider text-emerald-400 group-hover:translate-x-1 transition-all">
                    <span>Read Article</span>
                    <span>→</span>
                  </div>
                </div>
              ))}

              {filteredArticles.length === 0 && (
                <p className="text-sm text-slate-500 py-8 text-center col-span-3">
                  No educational articles matched your query.
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-slate-900/40 p-6 md:p-10 backdrop-blur-md space-y-6"
          >
            {/* Back CTA */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Articles</span>
            </button>

            {/* Article Meta */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xxs font-bold uppercase tracking-widest text-emerald-400">
                <span>{selectedArticle.category}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white/10"></span>
                <span className="flex items-center text-slate-400 font-normal normal-case">
                  <Clock className="h-3.5 w-3.5 mr-1" /> {selectedArticle.readTime}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                {selectedArticle.title}
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {selectedArticle.summary}
              </p>
            </div>

            {/* Article Content body */}
            <div className="border-t border-white/10 pt-6 text-slate-300 text-sm leading-relaxed space-y-1 prose prose-invert prose-emerald pb-6">
              {renderFormattedContent(selectedArticle.content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Article Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="max-w-xl w-full bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">
                  {t.articleFormTitle}
                </h2>
              </div>

              {formError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                  {formError}
                </div>
              )}

              <form onSubmit={handleAddArticle} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xxs font-bold uppercase tracking-wider text-slate-400">
                    {t.articleTitleLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Benefits of Hatha Yoga"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xxs font-bold uppercase tracking-wider text-slate-400">
                      {t.articleCategoryLabel}
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none transition-all"
                    >
                      <option value="Science">Science</option>
                      <option value="Philosophy">Philosophy</option>
                      <option value="History">History</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xxs font-bold uppercase tracking-wider text-slate-400">
                      {t.articleReadTimeLabel}
                    </label>
                    <input
                      type="text"
                      value={newReadTime}
                      onChange={(e) => setNewReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-1.5">
                  <label className="text-xxs font-bold uppercase tracking-wider text-slate-400">
                    {t.articleSummaryLabel}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Provide a brief summary of the article..."
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xxs font-bold uppercase tracking-wider text-slate-400">
                    {t.articleContentLabel}
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Enter the full article text. Use double asterisks **like this** for bold highlights, or dash - for bullet lists."
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition-all resize-y"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-slate-300 transition-all"
                  >
                    {t.btnCancel}
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    {t.btnSubmitArticle}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
