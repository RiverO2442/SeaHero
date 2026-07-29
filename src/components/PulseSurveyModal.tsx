import React, { useState } from "react";

type QuestionType = "rating" | "yesno" | "text";

interface Question {
  id: string;
  text: string;
  type: QuestionType;
}

interface Response {
  questionId: string;
  value: number | string;
}

interface SurveyResult {
  questionId: string;
  question: string;
  type: QuestionType;
  responses: (number | string)[];
}

const DEFAULT_QUESTIONS: Question[] = [
  { id: "q1", text: "How satisfied are you with your work-life balance this week?", type: "rating" },
  { id: "q2", text: "Do you feel supported by your manager?", type: "yesno" },
  { id: "q3", text: "What's one thing that would improve your work this week?", type: "text" },
];

const MOCK_RESULTS: SurveyResult[] = [
  { questionId: "q1", question: "How satisfied are you with your work-life balance this week?", type: "rating",
    responses: [4, 3, 5, 4, 2, 5, 3, 4, 4, 5, 3, 2, 4, 5, 4] },
  { questionId: "q2", question: "Do you feel supported by your manager?", type: "yesno",
    responses: [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1] },
  { questionId: "q3", question: "What's one thing that would improve your work this week?", type: "text",
    responses: ["More async comms", "Clearer sprint goals", "Better documentation", "Fewer meetings"] },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TYPE_LABELS: Record<QuestionType, string> = {
  rating: "1–5 Rating",
  yesno:  "Yes / No",
  text:   "Free Text",
};

const TYPE_ICONS: Record<QuestionType, string> = {
  rating: "star",
  yesno:  "thumbs_up_down",
  text:   "chat_bubble_outline",
};

export const PulseSurveyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<"build" | "preview" | "results">("build");
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [surveyTitle, setSurveyTitle] = useState("Weekly Pulse Check");
  const [addingQ, setAddingQ] = useState(false);
  const [newQ, setNewQ] = useState({ text: "", type: "rating" as QuestionType });
  const [previewResponses, setPreviewResponses] = useState<Record<string, Response>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const addQuestion = () => {
    if (!newQ.text.trim()) return;
    setQuestions(prev => [...prev, { id: `q${Date.now()}`, ...newQ }]);
    setAddingQ(false);
    setNewQ({ text: "", type: "rating" });
  };

  const removeQuestion = (id: string) => setQuestions(prev => prev.filter(q => q.id !== id));

  const setResponse = (qId: string, value: number | string) => {
    setPreviewResponses(prev => ({ ...prev, [qId]: { questionId: qId, value } }));
  };

  const avgRating = (responses: (number | string)[]) => {
    const nums = responses.filter(r => typeof r === "number") as number[];
    return nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : "—";
  };

  const yesCount = (responses: (number | string)[]) => (responses as number[]).filter(r => r === 1).length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Pulse Survey</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
          <div className="flex gap-2">
            {(["build","preview","results"] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setSubmitted(false); }}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`}>
                {t === "build" ? "Builder" : t === "preview" ? "Preview" : "Results"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* ── Builder ── */}
          {tab === "build" && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Survey Title</label>
                <input value={surveyTitle} onChange={e => setSurveyTitle(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="space-y-2">
                {questions.map((q, i) => (
                  <div key={q.id} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <span className="text-xs font-bold text-slate-400 mt-0.5 w-5 text-right shrink-0">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{q.text}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-slate-400 text-sm">{TYPE_ICONS[q.type]}</span>
                        <span className="text-xs text-slate-400">{TYPE_LABELS[q.type]}</span>
                      </div>
                    </div>
                    <button onClick={() => removeQuestion(q.id)} className="text-slate-300 hover:text-red-400 transition-colors shrink-0">
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                ))}
              </div>

              {addingQ ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700 space-y-3">
                  <input placeholder="Question text…" value={newQ.text} onChange={e => setNewQ(v => ({ ...v, text: e.target.value }))}
                    className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <div className="flex gap-2">
                    {(["rating","yesno","text"] as QuestionType[]).map(t => (
                      <button key={t} onClick={() => setNewQ(v => ({ ...v, type: t }))}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${newQ.type === t ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-50"}`}>
                        <span className="material-symbols-outlined text-sm">{TYPE_ICONS[t]}</span>
                        {TYPE_LABELS[t]}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={addQuestion} className="flex-1 bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-700">Add Question</button>
                    <button onClick={() => setAddingQ(false)} className="flex-1 bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-lg hover:bg-slate-300">Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setAddingQ(true)}
                  className="w-full border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl py-3 text-sm text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-base">add</span>
                  Add Question
                </button>
              )}

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">send</span>
                Send Survey to All Employees
              </button>
            </>
          )}

          {/* ── Preview ── */}
          {tab === "preview" && (
            <>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="material-symbols-outlined text-5xl text-green-500 mb-3">check_circle</span>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">Thank you!</p>
                  <p className="text-sm text-slate-500 mt-1">Your response has been recorded.</p>
                  <button onClick={() => { setSubmitted(false); setPreviewResponses({}); }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">
                    Reset Preview
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{surveyTitle}</p>
                  <p className="text-xs text-slate-500">This is a preview of how employees will see the survey.</p>
                  <div className="space-y-5">
                    {questions.map((q, i) => (
                      <div key={q.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">{i + 1}. {q.text}</p>
                        {q.type === "rating" && (
                          <div className="flex gap-2">
                            {[1,2,3,4,5].map(n => (
                              <button key={n} onClick={() => setResponse(q.id, n)}
                                className={`w-10 h-10 rounded-full text-sm font-bold transition-colors border-2 ${previewResponses[q.id]?.value === n ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-400"}`}>
                                {n}
                              </button>
                            ))}
                          </div>
                        )}
                        {q.type === "yesno" && (
                          <div className="flex gap-3">
                            {[["Yes", 1], ["No", 0]].map(([label, val]) => (
                              <button key={label as string} onClick={() => setResponse(q.id, val as number)}
                                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors border-2 ${previewResponses[q.id]?.value === val ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-400"}`}>
                                {label}
                              </button>
                            ))}
                          </div>
                        )}
                        {q.type === "text" && (
                          <textarea rows={3} placeholder="Type your answer…"
                            value={previewResponses[q.id]?.value as string ?? ""}
                            onChange={e => setResponse(q.id, e.target.value)}
                            className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                        )}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setSubmitted(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
                    Submit Response
                  </button>
                </>
              )}
            </>
          )}

          {/* ── Results ── */}
          {tab === "results" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Sample results from <span className="font-semibold text-slate-800 dark:text-slate-100">15 responses</span></p>
                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Last sent 3 days ago</span>
              </div>
              {MOCK_RESULTS.map(r => (
                <div key={r.questionId} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">{r.question}</p>
                  {r.type === "rating" && (
                    <div className="space-y-1">
                      {[5,4,3,2,1].map(n => {
                        const count = (r.responses as number[]).filter(v => v === n).length;
                        const pct = Math.round((count / r.responses.length) * 100);
                        return (
                          <div key={n} className="flex items-center gap-3">
                            <span className="text-xs text-slate-500 w-4 text-right">{n}</span>
                            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-slate-500 w-8">{count}</span>
                          </div>
                        );
                      })}
                      <p className="text-sm font-bold text-blue-600 mt-2">Avg: {avgRating(r.responses)} / 5</p>
                    </div>
                  )}
                  {r.type === "yesno" && (
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{yesCount(r.responses)}</p>
                        <p className="text-xs text-slate-500">Yes</p>
                      </div>
                      <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.round(yesCount(r.responses) / r.responses.length * 100)}%` }} />
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-500">{r.responses.length - yesCount(r.responses)}</p>
                        <p className="text-xs text-slate-500">No</p>
                      </div>
                    </div>
                  )}
                  {r.type === "text" && (
                    <div className="space-y-2">
                      {(r.responses as string[]).map((resp, i) => (
                        <div key={i} className="bg-white dark:bg-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                          "{resp}"
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
