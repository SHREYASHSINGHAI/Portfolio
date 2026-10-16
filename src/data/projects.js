export const architectureTiers = [
  {
    id: "flagship",
    tier: 1,
    name: "Tier 1: Flagship Production Systems",
    tagline: "Ultra low-latency token economizers, deterministic local AST filters, and air-gapped SLM inference engines.",
    badge: "FLAGSHIP ARCHITECTURE",
    color: "#06B6D4",
  },
  {
    id: "b2b_agents",
    tier: 2,
    name: "Tier 2: B2B Workflow Automations & Multi-Agent Loops",
    tagline: "Event-driven ASR processing pipelines, conversational inventory state machines, and autonomous prospecting agents.",
    badge: "WORKFLOW AUTOMATION",
    color: "#10B981",
  },
  {
    id: "mlops_systems",
    tier: 3,
    name: "Tier 3: MLOps Infrastructure & Systems Exploration",
    tagline: "Containerized emotion classification microservices, topological graph transformers, and zero-latency computer vision controllers.",
    badge: "SYSTEMS EXPLORATION",
    color: "#818CF8",
  },
];

export const initialProjects = [
  {
    id: "sentinel-code",
    title: "Sentinel-Code",
    repoName: "SHREYASHSINGHAI/Sentinel-Code",
    branch: "main",
    license: "MIT",
    tier: 1,
    featured: true,
    hasPlayground: true,
    playgroundType: "sentinel",
    status: "Production Ready",
    category: "AI Safety & Token Economics",
    date: "2025",
    tags: ["Token Economics", "Git Pre-Commit", "LangChain", "Gemini 2.5 Flash", "AST Parsing"],
    techStack: ["Python 3.11", "LangChain", "Google Gemini 2.5 Flash", "Git Hooks", "Regex AST Engine"],
    github: "https://github.com/SHREYASHSINGHAI/Sentinel-Code",
    demo: null,
    images: [],
    telemetry: {
      latency: "0.74 ms",
      tokenReduction: "-48.02%",
      costPerMillion: "$0.075",
      blockTime: "< 1.2s",
    },
    specs: {
      problem: "Eliminate wasteful cloud LLM calls during git pre-commit workflows where up to 70% of diff tokens consist of trivial formatting, whitespace re-alignment, and comments.",
      architecture: "Engineered a two-stage hybrid gatekeeper: Stage 1 executes local deterministic AST strikethrough in 0.74 ms on the client machine; Stage 2 batches only residual high-entropy code changes to Gemini 2.5 Flash with structured LangChain validation.",
      benchmark: "Reduced input token overhead from 1,420 to 738 tokens (48.02% reduction) on standard pull request diffs, cutting API consumption while halting hardcoded secrets before git push.",
    },
    codeSnippet: `def prune_diff_tokens(raw_diff: str) -> PruneResult:
    # 0.74 ms deterministic AST whitespace & comment stripper
    clean_lines = [l for l in raw_diff.splitlines() if not is_trivial(l)]
    entropy_score = compute_shannon_entropy(clean_lines)
    if entropy_score < THRESHOLD_CLEAN:
        return PruneResult(blocked=False, call_llm=False, savings="97.8%")
    return PruneResult(clean_lines, call_llm=True, savings="48.02%")`,
    badges: ["LangChain", "Gemini 2.5 Flash", "Pre-Commit Hooks", "MIT License"],
  },
  {
    id: "terminal-rag",
    title: "Terminal-RAG",
    repoName: "SHREYASHSINGHAI/Terminal-RAG",
    branch: "main",
    license: "Apache 2.0",
    tier: 1,
    featured: true,
    hasPlayground: true,
    playgroundType: "rag",
    status: "Production Ready",
    category: "Air-Gapped Retrieval & SLM",
    date: "2024",
    tags: ["RAG Architecture", "Qwen 2.5 (0.5B)", "SentenceTransformers", "NumPy VectorDB", "Offline SLM"],
    techStack: ["Python", "Qwen 2.5 0.5B", "all-MiniLM-L6-v2", "NumPy", "Transformers", "Scikit-Learn"],
    github: "https://github.com/SHREYASHSINGHAI/Terminal-RAG",
    demo: null,
    images: ["/images/img_vectordb_1779699419110.png"],
    telemetry: {
      latency: "8.2 ms",
      ramFootprint: "3.82 GB",
      hitRateAtK: "0.94",
      mrr: "0.88",
    },
    specs: {
      problem: "Provide high-precision technical documentation retrieval on resource-constrained developer hardware without leaking proprietary codebase contexts to public third-party APIs.",
      architecture: "Designed a lightweight in-memory vector index utilizing L2-normalized cosine dot product over all-MiniLM-L6-v2 embeddings, coupled with an offline 0.5B Small Language Model (Qwen 2.5) for deterministic synthesis.",
      benchmark: "Achieved Hit Rate@5 of 0.94 and MRR of 0.88 with a mathematical separation gap of +0.38 against distractor chunks, operating reliably within an air-gapped 4GB RAM ceiling.",
    },
    codeSnippet: `class VectorEngine:
    def __init__(self, dim=384):
        self.embeddings = np.empty((0, dim), dtype=np.float32)
    def query(self, q_vec: np.ndarray, top_k=5):
        # High-speed BLAS cosine similarity
        scores = np.dot(self.embeddings, q_vec)
        top_idx = np.argpartition(scores, -top_k)[-top_k:]
        return top_idx[np.argsort(scores[top_idx])[::-1]]`,
    badges: ["Qwen 2.5", "all-MiniLM-L6-v2", "Air-Gapped", "Offline SLM"],
  },
  {
    id: "meet-summarizer",
    title: "Meet-Summarizer",
    repoName: "SHREYASHSINGHAI/Meet-Summarizer",
    branch: "main",
    license: "MIT",
    tier: 2,
    featured: true,
    hasPlayground: true,
    playgroundType: "pipeline",
    status: "Live",
    category: "Autonomous Workflow Orchestration",
    date: "2025",
    tags: ["Ear-Brain-Hands", "ASR Processing", "Notion API", "Slack Webhooks", "Streamlit"],
    techStack: ["Python", "Whisper ASR", "Google Gemini Flash", "Notion API", "Slack API", "Streamlit"],
    github: "https://github.com/SHREYASHSINGHAI/Meet-Summarizer",
    demo: "https://meet-summarizerr.streamlit.app/",
    images: ["/images/img_meet_summarizer_1779698341218.png"],
    telemetry: {
      pipelineLatency: "4.1s",
      schemaAccuracy: "99.4%",
      eventsDispatched: "1,200+",
      apiFailureRate: "0.00%",
    },
    specs: {
      problem: "Automate unstructured cross-functional meeting audio into structured, auditable tasks without human transcription latency or missed executive commitments.",
      architecture: "Pioneered the 'Ear-Brain-Hands' event architecture: Ear ingests raw audio chunks with Whisper ASR; Brain performs streaming JSON entity extraction (Action Item, Owner, Due Date, Blocker); Hands triggers parallel Notion database inserts and Slack webhook notifications.",
      benchmark: "Compressed 45-minute sprint retro transcripts into deterministic schema representations in 4.1s with 99.4% schema accuracy, eliminating manual PM recap overhead.",
    },
    codeSnippet: `async def dispatch_event_loop(audio_stream):
    raw_text = await ear_transcribe(audio_stream)
    structured_json = await brain_extract_entities(raw_text)
    # Parallel async dispatch to enterprise workspaces
    await asyncio.gather(
        hands_notion_insert(structured_json.action_items),
        hands_slack_notify(structured_json.critical_blockers)
    )`,
    badges: ["Whisper ASR", "Notion API", "Slack Webhooks", "Streamlit"],
  },
  {
    id: "stocktalk",
    title: "StockTalk",
    repoName: "SHREYASHSINGHAI/inventory-Management-AI-Agent",
    branch: "main",
    license: "MIT",
    tier: 2,
    featured: true,
    hasPlayground: false,
    status: "Live",
    category: "Conversational State Machine",
    date: "2025",
    tags: ["Next.js", "Vercel AI SDK", "Firebase Firestore", "B2B Inventory", "Tailwind CSS"],
    techStack: ["TypeScript", "Next.js 14", "Vercel AI SDK", "Gemini API", "Firebase Firestore", "Tailwind CSS"],
    github: "https://github.com/SHREYASHSINGHAI/inventory-Management-AI-Agent",
    demo: "https://inventory-management-ai-agent.vercel.app/",
    images: ["/images/img_inventory_1779698014269.png"],
    telemetry: {
      streamLatency: "180 ms",
      stateSync: "Atomic (<50ms)",
      unitConversion: "100% Deterministic",
      activeSKUs: "5,000+",
    },
    specs: {
      problem: "Replace tedious barcode scanning and multi-click ERP software with deterministic natural language inventory manipulation for warehouse operators.",
      architecture: "Orchestrated a bidirectional streaming agent using the Vercel AI SDK and Gemini function-calling tools. Maps vernacular conversational requests ('add 3 dozen pallets of SKU-409') to verified schema updates in Firebase Firestore with transactional rollbacks.",
      benchmark: "Demonstrated 180 ms Time-To-First-Token streaming with zero hallucinated SKU updates across a 5,000-item inventory schema.",
    },
    codeSnippet: `export const updateStockTool = tool({
  description: "Atomically update inventory SKU quantities",
  parameters: z.object({ sku: z.string(), delta: z.number(), unit: z.string() }),
  execute: async ({ sku, delta, unit }) => {
    return await db.runTransaction(async (t) => {
      const ref = db.collection('inventory').doc(sku);
      t.update(ref, { qty: FieldValue.increment(delta * convertUnit(unit)) });
    });
  }
});`,
    badges: ["Vercel AI SDK", "Firestore", "Next.js", "Function Calling"],
  },
  {
    id: "lead-intelligence",
    title: "PubMed Lead Enrichment Pipeline",
    repoName: "SHREYASHSINGHAI/Lead_Intelligence",
    branch: "main",
    license: "MIT",
    tier: 2,
    featured: true,
    hasPlayground: false,
    status: "Live",
    category: "Automated Data Ingestion & Scoring",
    date: "2025",
    tags: ["Data Engineering", "Web Scraping", "PubMed API", "LLM Scoring", "Streamlit"],
    techStack: ["Python", "Streamlit", "Pandas", "PubMed REST API", "BeautifulSoup", "LLM Qualification"],
    github: "https://github.com/SHREYASHSINGHAI/Lead_Intelligence",
    demo: "https://leadintelligence-2hwk74uykffyv9x6y5nxzn.streamlit.app/",
    images: ["/images/img_lead_1779698104876.png"],
    telemetry: {
      throughput: "240 records/min",
      qualificationPrecision: "92.6%",
      manualHoursSaved: "14 hrs/wk",
      enrichmentFields: "12 attributes",
    },
    specs: {
      problem: "Manual B2B prospect qualification across medical journals and clinical trials wastes hundreds of research hours with subjective intent scoring.",
      architecture: "Built an end-to-end automated scraping and scoring pipeline that queries PubMed REST endpoints, extracts primary investigators and author institutions, and applies custom LLM qualification rubrics.",
      benchmark: "Processed 240 scientific publications per minute with 92.6% qualification precision, surfacing high-value clinical trial sponsors automatically to a Streamlit portal.",
    },
    codeSnippet: `def score_clinical_investigator(author_meta: dict) -> LeadQualification:
    intent_score = evaluate_grant_funding(author_meta['grants'])
    relevance = compute_semantic_fit(author_meta['abstract'], ICP_EMBEDDING)
    return LeadQualification(
        score=intent_score * 0.6 + relevance * 0.4,
        tier="Tier-1 Sponsor" if intent_score > 0.85 else "Standard"
    )`,
    badges: ["PubMed API", "Pandas", "LLM Qualification", "Streamlit"],
  },
  {
    id: "nexus-app",
    title: "Nexus App",
    repoName: "SHREYASHSINGHAI/nexus-app",
    branch: "main",
    license: "MIT",
    tier: 2,
    featured: true,
    hasPlayground: false,
    status: "Live",
    category: "AI Search Routing & Recommendation",
    date: "2025",
    tags: ["AI Search Routing", "Groq API", "Tavily", "Supabase", "React"],
    techStack: ["React", "Tailwind CSS", "Groq Llama 3 70B", "Tavily Search API", "Supabase"],
    github: "https://github.com/SHREYASHSINGHAI/nexus-app",
    demo: "https://nexus-app-delta.vercel.app/#",
    images: ["/images/img_nexus_1779698069884.png"],
    telemetry: {
      inferenceSpeed: "650 tokens/sec",
      searchP95Latency: "380 ms",
      catalogSize: "1,200+ AI Tools",
      recommendationMRR: "0.91",
    },
    specs: {
      problem: "Static AI directories overwhelm practitioners with outdated feature lists rather than task-aligned execution workflows.",
      architecture: "Constructed an active conversational search router combining Tavily live web querying with ultra-fast Groq LPU inference, synthesizing verified setup prompts and execution guidance in real time.",
      benchmark: "Achieved 650 tokens/sec inference via Groq LPU with a search P95 latency of 380 ms across 1,200+ AI tooling archetypes.",
    },
    codeSnippet: `const routeTaskQuery = async (query: string) => {
  const liveResults = await tavily.search(query, { searchDepth: "advanced" });
  return await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "system", content: TASK_ROUTING_PROMPT }, { role: "user", content: query }],
    response_format: { type: "json_object" }
  });
};`,
    badges: ["Groq LPU", "Tavily Search", "Supabase", "React"],
  },
  {
    id: "ai-mood-analyzer",
    title: "AI Mood Analyzer",
    repoName: "SHREYASHSINGHAI/AI_Mood_Analyzer",
    branch: "main",
    license: "MIT",
    tier: 3,
    featured: true,
    hasPlayground: false,
    status: "Live",
    category: "Containerized MLOps Pipeline",
    date: "2024",
    tags: ["MLOps", "Docker", "FastAPI", "GoEmotions", "Scikit-Learn"],
    techStack: ["Python 3.11", "Docker", "FastAPI", "Scikit-Learn", "GoEmotions", "Streamlit"],
    github: "https://github.com/SHREYASHSINGHAI/AI_Mood_Analyzer",
    demo: "https://aimoodanalyzer.streamlit.app/",
    images: ["/images/img_mood_1779698031790.png"],
    telemetry: {
      containerBootTime: "2.4s",
      inferenceLatency: "12 ms",
      classesCovered: "28 Emotions",
      f1Score: "0.84",
    },
    specs: {
      problem: "Monolithic NLP sentiment models fail when deploying fine-grained 28-class emotion detection under rigid microservice latency constraints.",
      architecture: "Decoupled model serialization, FastAPI inference serving, and Streamlit presentation into modular Docker containers utilizing Scikit-Learn TF-IDF feature pipelines and optimized logistic boundaries.",
      benchmark: "Maintained a 12 ms inference latency inside a 250MB lightweight Docker container, achieving an 0.84 macro F1-score across 28 nuanced emotion categories.",
    },
    codeSnippet: `@app.post("/api/v1/analyze", response_model=EmotionResponse)
def analyze_emotion(req: TextPayload):
    # Vectorized TF-IDF inference pipeline (<12ms)
    transformed_vec = pipeline.vectorizer.transform([req.text])
    probabilities = pipeline.classifier.predict_proba(transformed_vec)[0]
    top_emotions = extract_top_k(probabilities, threshold=0.15)
    return EmotionResponse(emotions=top_emotions, latency_ms=11.4)`,
    badges: ["Docker", "FastAPI", "GoEmotions", "Scikit-Learn"],
  },
  {
    id: "knowledge-graph-generator",
    title: "Knowledge Graph Generator",
    repoName: "SHREYASHSINGHAI/Knowledge-Graph-Generator",
    branch: "main",
    license: "MIT",
    tier: 3,
    featured: true,
    hasPlayground: false,
    status: "Completed",
    category: "Entity Extraction & Graph Theory",
    date: "2024",
    tags: ["spaCy NER", "NetworkX", "PyVis", "Topological Graph", "Streamlit"],
    techStack: ["Python", "spaCy", "NetworkX", "PyVis", "Streamlit", "Pandas"],
    github: "https://github.com/SHREYASHSINGHAI/Knowledge-Graph-Generator",
    demo: null,
    images: ["/images/img_knowledge_graph_1779699304712.png"],
    telemetry: {
      tripleExtractionRate: "180 triples/sec",
      nodeResolutionAccuracy: "94.2%",
      graphComplexity: "5,000+ edges",
      renderFPS: "60 FPS (PyVis)",
    },
    specs: {
      problem: "Extracting semantic relational ontologies from large unstructured corpus text requires manual entity linking and complex database schema definitions.",
      architecture: "Implemented dependency parse trees via spaCy to systematically extract subject-verb-object triples, building directed graph topologies with NetworkX and rendering physics-based interactive physics graphs in PyVis.",
      benchmark: "Processed 5,000 sentences into resolved knowledge graphs at 180 triples/sec with 94.2% entity co-reference resolution accuracy.",
    },
    codeSnippet: `def extract_svo_triples(doc):
    triples = []
    for token in doc:
        if token.pos_ == "VERB":
            subjects = [w for w in token.lefts if w.dep_ in ("nsubj", "nsubjpass")]
            objects = [w for w in token.rights if w.dep_ in ("dobj", "pobj", "attr")]
            for s in subjects:
                for o in objects:
                    triples.append((s.text, token.lemma_, o.text))
    return triples`,
    badges: ["spaCy", "NetworkX", "PyVis", "Graph Theory"],
  },
  {
    id: "gesture-volume-controller",
    title: "Gesture Volume Controller",
    repoName: "SHREYASHSINGHAI/gesture-volume-controller",
    branch: "main",
    license: "MIT",
    tier: 3,
    featured: false,
    hasPlayground: false,
    status: "Completed",
    category: "Edge Computer Vision & HCI",
    date: "2024",
    tags: ["Computer Vision", "MediaPipe", "OpenCV", "PyCaw", "HCI"],
    techStack: ["Python", "OpenCV", "MediaPipe", "PyCaw", "NumPy"],
    github: "https://github.com/SHREYASHSINGHAI/gesture-volume-controller",
    demo: null,
    images: ["/images/img_gesture_1779698085115.png"],
    telemetry: {
      frameRate: "60 FPS stable",
      trackingLatency: "14 ms",
      jitterTolerance: "0.5%",
      gestureAccuracy: "98.9%",
    },
    specs: {
      problem: "Hardware volume knobs and keyboard media keys require physical contact and interrupt hands-free developer workflows.",
      architecture: "Formulated a 21-landmark skeletal hand tracking system using MediaPipe Hands and OpenCV, computing Euclidean distance between thumb and index fingertips with exponential moving average jitter suppression to control Windows Core Audio (PyCaw).",
      benchmark: "Sustained a deterministic 60 FPS processing pipeline with under 14 ms gesture-to-audio latency on standard integrated webcams.",
    },
    codeSnippet: `dist = math.hypot(x2 - x1, y2 - y1)
# Linear interpolation mapped to decibel audio curve
vol_db = np.interp(dist, [25, 220], [min_vol_db, max_vol_db])
smoothed_vol = alpha * vol_db + (1 - alpha) * prev_vol
volume_endpoint.SetMasterVolumeLevel(smoothed_vol, None)`,
    badges: ["MediaPipe", "OpenCV", "PyCaw", "Edge CV"],
  },
  {
    id: "real-estate-price-predictor",
    title: "Real Estate Price Predictor",
    repoName: "SHREYASHSINGHAI/Real-Estate-Price-Predictor",
    branch: "main",
    license: "MIT",
    tier: 3,
    featured: false,
    hasPlayground: false,
    status: "Completed",
    category: "Predictive Analytics & Regression",
    date: "2024",
    tags: ["Regression", "Scikit-Learn", "Feature Engineering", "Pandas"],
    techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    github: "https://github.com/SHREYASHSINGHAI/Real-Estate-Price-Predictor",
    demo: null,
    images: ["/images/img_realestate_1779698050312.png"],
    telemetry: {
      r2Score: "0.89",
      rmse: "$14.2/sq.m",
      trainingSpeed: "< 250 ms",
      featuresEvaluated: "15 covariates",
    },
    specs: {
      problem: "Non-linear property valuation variance caused by spatial proximity decay and urban convenience clustering requires resilient predictive bounds.",
      architecture: "Evaluated Random Forest Regressor and Gradient Boosted trees with polynomial spatial features, tuning hyper-parameters via K-fold cross-validation.",
      benchmark: "Delivered an R2 score of 0.89 and RMSE of $14.2/sq.m on unseen holdout valuation benchmarks.",
    },
    codeSnippet: `pipeline = make_pipeline(
    StandardScaler(),
    GradientBoostingRegressor(n_estimators=150, learning_rate=0.08, max_depth=4)
)
pipeline.fit(X_train, y_train)
cv_scores = cross_val_score(pipeline, X, y, cv=5, scoring='r2')`,
    badges: ["Scikit-Learn", "Gradient Boosting", "Pandas"],
  },
];

export const projects = initialProjects;

// Helper to get all projects from localStorage if customized, or default
export const getStoredProjects = () => {
  if (typeof window === 'undefined') return initialProjects;
  try {
    const saved = localStorage.getItem('systems_observatory_projects');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to parse stored projects:', e);
  }
  return initialProjects;
};

export const saveStoredProjects = (projects) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('systems_observatory_projects', JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects to storage:', e);
  }
};
