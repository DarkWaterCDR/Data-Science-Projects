## Draft README 1 — K-Means Clustering of Healthy Habits

Synopsis
- Purpose: Explore which daily habits (exercise duration, sleep hours, meeting count, and a time proxy) naturally group into meaningful improvements in perceived end-of-day mood.
- Methods: Cleaned and encoded fields (mood label mapping; date → epoch seconds), standardized features, used the elbow method (k=1..10) to select k=3, trained K-Means, appended cluster labels, and visualized pairwise relationships colored by cluster.
- Scope: Descriptive, exploratory clustering and visualization only (no prediction or causal inference).

Skills demonstrated (career-focused)
- Data wrangling and feature preparation (type conversion, categorical encoding, scaling)
- Unsupervised learning with K-Means and heuristic model selection (elbow/SSE)
- Exploratory visualization and pattern interpretation for stakeholder communication
- Reproducible Python workflow with pandas, scikit-learn, seaborn, and matplotlib