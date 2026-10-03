# Awesome AI Learning World [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated catalog of AI learning resources — courses and the papers, books and docs that go with them — grouped by skill.

Every resource here meets the [inclusion criteria](CONTRIBUTING.md#inclusion-criteria): official source, a verifiable author, free or free to audit, still relevant, and teaching concepts rather than button clicks. The same catalog powers [AI Learning World](https://ailearnworld.com), where you can drop any of these onto your own learning board and track your progress.

## Contents

- [Learning Paths](#learning-paths)
- [AI Foundations](#ai-foundations)
- [Machine Learning](#machine-learning)
- [Deep Learning](#deep-learning)
- [Computer Vision](#computer-vision)
- [NLP](#nlp)
- [LLMs](#llms)
- [Generative AI](#generative-ai)
- [AI Agents](#ai-agents)
- [Reinforcement Learning](#reinforcement-learning)
- [MLOps](#mlops)
- [ML Systems](#ml-systems)
- [Math](#math)
- [Programming](#programming)
- [Computer Systems](#computer-systems)
- [Databases](#databases)
- [Backend](#backend)
- [DevOps](#devops)
- [Data Engineering](#data-engineering)
- [Technical Writing](#technical-writing)
- [Staying Current](#staying-current)

## Learning Paths

Ready-made routes through the catalog, stage by stage. On [AI Learning World](https://ailearnworld.com) you can start your board from one of them.

### Hello AI World

The whole map in one board: programming and math, machine learning, deep learning, then large language models, ML systems or computer vision — and interview prep at the end. Pick the branch that matches the job you want.

**Programming**

1. **Programming** — You can write, test and debug a Python program on your own.
   - [CS50's Introduction to Programming with Python](https://cs50.harvard.edu/python/)
2. **Data Structures & Algorithms** — You can implement common data structures and algorithms, analyze their running time, and choose the right one for a problem.
   - [6.006 Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
3. **Python for Data** — You can work with NumPy arrays, and load, clean, explore and plot a dataset with pandas in a notebook.
   - [Python Programming for Economics and Finance](https://python-programming.quantecon.org/intro.html)
   - [Kaggle Learn: Pandas](https://www.kaggle.com/learn/pandas)

**Math**

1. **Calculus** — You can take derivatives and partial derivatives, compute a gradient, and apply the chain rule.
   - [Precalculus](https://www.khanacademy.org/math/precalculus)
   - [Differential Calculus](https://www.khanacademy.org/math/differential-calculus)
   - [Multivariable calculus](https://www.khanacademy.org/math/multivariable-calculus)
2. **Linear Algebra** — You can multiply matrices and explain, geometrically, what a matrix does to a vector.
   - [Linear algebra](https://www.khanacademy.org/math/linear-algebra)
   - [Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra)
3. **Probability & Statistics** — You can work with probability, random variables and distributions, and test a hypothesis.
   - [Statistics and probability](https://www.khanacademy.org/math/statistics-probability)

**Machine Learning**

1. **Core Machine Learning** — You can train, evaluate and compare regression and classification models.
   - [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)

**Deep Learning**

1. **Neural Networks** — You can implement backpropagation from scratch and build a small GPT.
   - [Neural Networks](https://www.3blue1brown.com/topics/neural-networks)
   - [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)
2. **Practice** — You can train an image or text model in PyTorch and explain each step.
   - [Practical Deep Learning for Coders](https://course.fast.ai/)
   - [Dive into Deep Learning](https://d2l.ai/)
3. **Theory** — You can explain why deep networks train: optimization, initialization, regularization and normalization.
   - [Understanding Deep Learning](https://udlbook.github.io/udlbook/)
4. **Attention** — You can explain how attention works and why Transformers replaced recurrent networks.
   - [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
5. **Generative Models** — You can explain how a diffusion model turns noise into an image, and implement one.
   - [Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion](https://course.fast.ai/Lessons/part2.html)

**Large Language Models**

1. **Transformers & NLP** — You can explain attention and implement a Transformer-based NLP model.
   - [CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n/)
2. **LLM Training** — You can explain pretraining, fine-tuning and LoRA, and fine-tune a small model.
   - [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)
3. **RAG & Evaluation** — You can build a retrieval-augmented app end to end, compare at least two retrieval approaches, and write up where its answers fail.
   - [LLM Zoomcamp](https://github.com/DataTalksClub/llm-zoomcamp)
4. **Agents** — You can build an agent that uses tools, and evaluate it.
   - [Hugging Face AI Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction)

**ML Systems**

1. **MLOps** — You can deploy a model, track experiments and monitor it in production.
   - [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp)
2. **ML System Design** — You can design an ML system end to end and explain its trade-offs.
   - [CMU 17-445/645 — Machine Learning in Production](https://mlip-cmu.github.io/)
3. **Training at Scale** — You can explain mixed precision, data and model parallelism, and quantization, and when each one helps.
   - [The Ultra-Scale Playbook: Training LLMs on GPU Clusters](https://huggingface.co/spaces/nanotron/ultrascale-playbook)
4. **Portfolio Project** — You can take one model from raw data to a deployed, tested service, show where it fails, and explain your trade-offs.
   - [Made With ML — MLOps](https://madewithml.com/courses/mlops/)

**Computer Vision**

1. **Classical CV** — You can explain image formation, filtering, edges, features, camera calibration and stereo.
   - [First Principles of Computer Vision](https://fpcv.cs.columbia.edu/)
   - [CS131: Computer Vision: Foundations and Applications](https://stanford-cs131.github.io/winter2025/)
2. **CNNs** — You can explain how a CNN sees an image and why residual connections help.
   - [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/)
3. **Vision Transformers** — You can explain how ViT and CLIP apply attention to images.
   - [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)
4. **Portfolio Project** — You can fine-tune a detector on your own dataset, evaluate it per class with mAP, show where it fails, and deploy it behind an API.
   - [Fine-Tuning Object Detection Model on a Custom Dataset, Deployment in Spaces, and Gradio API Integration](https://huggingface.co/learn/cookbook/fine_tuning_detr_custom_dataset)

**Interview Prep**

1. **Coding & Behavioral** — You can solve timed coding problems on data structures and algorithms. You have 3–5 STAR stories ready that show what you did on a team, the result in numbers, and what you learned.
   - [Tech Interview Handbook](https://www.techinterviewhandbook.org/)
2. **ML & DL Questions** — You can answer machine learning and deep learning knowledge and system design questions under time pressure.
   - [Introduction to Machine Learning Interviews Book](https://huyenchip.com/ml-interviews-book/)
   - [Machine Learning Q and AI](https://sebastianraschka.com/books/ml-q-and-ai/)
   - [Deep Learning Interviews](https://arxiv.org/abs/2201.00650)

### AI Engineer

How large language models work, and how to build, evaluate and debug systems on top of them. Start after Foundations.

1. **Transformers & NLP** — You can explain attention and implement a Transformer-based NLP model.
   - [CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n/)
   - *Go deeper:* [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) · [CME 295 - Transformers & Large Language Models (Autumn 2025)](https://cme295.stanford.edu/syllabus/2025/) · [Attention Is All You Need](https://arxiv.org/abs/1706.03762) · [CMU 11-711 — Advanced Natural Language Processing](https://cmu-l3.github.io/anlp-spring2026/) · [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/) · [NLP Course | For You](https://lena-voita.github.io/nlp_course.html)
2. **LLM Training & Fine-tuning** — You can explain pretraining, fine-tuning and LoRA, and fine-tune a small model.
   - [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)
   - *Go deeper:* [CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) · [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685) · [Hugging Face smol-course](https://huggingface.co/learn/smol-course/unit0/1) · [Build a Large Language Model (From Scratch)](https://github.com/rasbt/LLMs-from-scratch) · [Reinforcement Learning from Human Feedback and LLM Post-Training](https://rlhfbook.com/) · [The Ultra-Scale Playbook: Training LLMs on GPU Clusters](https://huggingface.co/spaces/nanotron/ultrascale-playbook) · [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155) · [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290) · [Foundations of Large Language Models](https://arxiv.org/abs/2501.09223)
3. **RAG & Evaluation** — You can build a retrieval-augmented app end to end, compare at least two retrieval approaches, and write up where its answers fail.
   - [LLM Zoomcamp](https://github.com/DataTalksClub/llm-zoomcamp)
   - *Go deeper:* [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) · [Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/) · [What We've Learned From A Year of Building with LLMs](https://applied-llms.org/) · [The LLM Evaluation Guidebook](https://huggingface.co/spaces/OpenEvals/evaluation-guidebook) · [Patterns for Building LLM-based Systems & Products](https://eugeneyan.com/writing/llm-patterns/)
4. **AI Agents** — You can build an agent that uses tools, and evaluate it.
   - [Hugging Face AI Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction)
   - *Go deeper:* [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) · [Evaluating AI Agents](https://www.deeplearning.ai/courses/evaluating-ai-agents/) · [LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) · [Agents](https://huyenchip.com/2025/01/07/agents.html) · [Agentic AI MOOC](https://agenticai-learning.org/f25) · [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
5. **Interview Prep** — You can solve timed coding problems on data structures and algorithms, and answer ML knowledge and system design questions under time pressure. You have 3–5 STAR stories ready that show what you did on a team, the result in numbers, and what you learned.
   - [Tech Interview Handbook](https://www.techinterviewhandbook.org/)
   - [Machine Learning Q and AI](https://sebastianraschka.com/books/ml-q-and-ai/)
   - *Go deeper:* [Introduction to Machine Learning Interviews Book](https://huyenchip.com/ml-interviews-book/) · [6.006 Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) · [Transformers & LLMs cheatsheet for Stanford's CME 295](https://github.com/afshinea/stanford-cme-295-transformers-large-language-models/tree/main/en) · [Building A Generative AI Platform](https://huyenchip.com/2024/07/25/genai-platform.html) · [Machine Learning FAQ](https://sebastianraschka.com/faq/)

### Computer Vision Engineer

From image formation to CNNs, vision transformers and generative models. Start after Foundations.

1. **Deep Learning** — You can train an image or text model in PyTorch, explain each step, and explain how attention works.
   - [Practical Deep Learning for Coders](https://course.fast.ai/)
   - [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
   - *Go deeper:* [PyTorch Tutorials](https://docs.pytorch.org/tutorials/) · [MIT 6.S191 — Introduction to Deep Learning](https://introtodeeplearning.com/) · [UvA Deep Learning Tutorials](https://uvadlc-notebooks.readthedocs.io/en/latest/)
2. **Classical Computer Vision** — You can explain image formation, edges, features, camera calibration and stereo.
   - [First Principles of Computer Vision](https://fpcv.cs.columbia.edu/)
   - [CS131: Computer Vision: Foundations and Applications](https://stanford-cs131.github.io/winter2025/)
   - *Go deeper:* [CS180/280A: Intro to Computer Vision and Computational Photography](https://cal-cs180.github.io/fa25/) · [Computer Vision: Algorithms and Applications, 2nd ed.](https://szeliski.org/Book/) · [Foundations of Computer Vision](https://visionbook.mit.edu/)
3. **CNNs for Vision** — You can explain how a CNN sees an image and why residual connections help.
   - [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/)
   - *Go deeper:* [Community Computer Vision Course](https://huggingface.co/learn/computer-vision-course/unit0/welcome/welcome) · [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)
4. **Detection & Segmentation** — You can explain and implement object detection and semantic segmentation (Dive into Deep Learning, chapter 14).
   - [Dive into Deep Learning](https://d2l.ai/)
   - *Go deeper:* [MIT 6.5940 — TinyML and Efficient Deep Learning Computing](https://hanlab.mit.edu/courses/2024-fall-65940) · [16-824: Visual Learning and Recognition](https://visual-learning.cs.cmu.edu/) · [You Only Look Once: Unified, Real-Time Object Detection](https://arxiv.org/abs/1506.02640) · [Mask R-CNN](https://arxiv.org/abs/1703.06870) · [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597) · [MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications](https://arxiv.org/abs/1704.04861) · [Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks](https://arxiv.org/abs/1506.01497) · [Segment Anything](https://arxiv.org/abs/2304.02643)
5. **Transformers for Vision** — You can explain how ViT and CLIP apply attention to images.
   - [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)
   - *Go deeper:* [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)
6. **Generative Models (optional)** — You can explain how a diffusion model turns noise into an image.
   - [Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion](https://course.fast.ai/Lessons/part2.html)
   - *Go deeper:* [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) · [CS236: Deep Generative Models](https://cs236.stanford.edu/) · [MIT 6.S184 — Introduction to Flow Matching and Diffusion Models](https://diffusion.csail.mit.edu/) · [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239) · [Understanding Diffusion Models: A Unified Perspective](https://arxiv.org/abs/2208.11970)
7. **Portfolio Project** — You can fine-tune a detector on your own dataset, evaluate it per class with mAP, show where it fails, and deploy it behind an API.
   - [Fine-Tuning Object Detection Model on a Custom Dataset, Deployment in Spaces, and Gradio API Integration](https://huggingface.co/learn/cookbook/fine_tuning_detr_custom_dataset)
8. **Interview Prep** — You can solve timed coding problems on data structures and algorithms, and answer ML knowledge and system design questions under time pressure. You have 3–5 STAR stories ready that show what you did on a team, the result in numbers, and what you learned.
   - [Tech Interview Handbook](https://www.techinterviewhandbook.org/)
   - [Introduction to Machine Learning Interviews Book](https://huyenchip.com/ml-interviews-book/)
   - *Go deeper:* [6.006 Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) · [Deep Learning Interviews](https://arxiv.org/abs/2201.00650) · [Stanford CS 229 Machine Learning Cheatsheets](https://stanford.edu/~shervine/teaching/cs-229/)

### Deep Learning Engineer

Design, train and scale neural networks, and know what happens underneath the framework. Start after Foundations.

1. **Deep Learning** — You can train an image or text model in PyTorch, explain each step, and explain how attention works.
   - [Practical Deep Learning for Coders](https://course.fast.ai/)
   - [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
   - *Go deeper:* [MIT 6.S191 — Introduction to Deep Learning](https://introtodeeplearning.com/) · [AI Engineering from Scratch](https://aiengineeringfromscratch.com/)
2. **Deep Learning in Depth** — You can derive and implement optimization, regularization and normalization for deep networks.
   - [Dive into Deep Learning](https://d2l.ai/)
   - [Understanding Deep Learning](https://udlbook.github.io/udlbook/)
   - *Go deeper:* [CMU 11-785 — Introduction to Deep Learning](https://deeplearning.cs.cmu.edu/) · [Deep Learning: Foundations and Concepts](https://www.bishopbook.com/) · [Deep Learning](https://www.deeplearningbook.org/)
3. **Architectures** — You can explain and implement CNNs and Transformers, and say when to use each.
   - [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/)
   - [CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n/)
   - *Go deeper:* [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) · [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
4. **Training & Efficiency** — You can explain mixed precision, data and model parallelism, and quantization, and when each one helps.
   - [The Ultra-Scale Playbook: Training LLMs on GPU Clusters](https://huggingface.co/spaces/nanotron/ultrascale-playbook)
   - *Go deeper:* [Deep Learning Systems: Algorithms and Implementation](https://dlsyscourse.org/) · [MIT 6.5940 — TinyML and Efficient Deep Learning Computing](https://hanlab.mit.edu/courses/2024-fall-65940) · [GPU MODE Lectures](https://github.com/gpu-mode/lectures)
5. **Generative Models** — You can explain how a diffusion model turns noise into an image, and implement one.
   - [Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion](https://course.fast.ai/Lessons/part2.html)
   - *Go deeper:* [MIT 6.S184 — Introduction to Flow Matching and Diffusion Models](https://diffusion.csail.mit.edu/) · [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)
6. **Portfolio Project** — You can take one model from raw data to a deployed, tested service, show where it fails, and explain your trade-offs.
   - [Made With ML — MLOps](https://madewithml.com/courses/mlops/)
7. **Interview Prep** — You can solve timed coding problems on data structures and algorithms, and answer ML knowledge and system design questions under time pressure. You have 3–5 STAR stories ready that show what you did on a team, the result in numbers, and what you learned.
   - [Tech Interview Handbook](https://www.techinterviewhandbook.org/)
   - [Introduction to Machine Learning Interviews Book](https://huyenchip.com/ml-interviews-book/)
   - [Deep Learning Interviews](https://arxiv.org/abs/2201.00650)
   - *Go deeper:* [Machine Learning Q and AI](https://sebastianraschka.com/books/ml-q-and-ai/)

### Foundations

Programming, math, machine learning and neural networks — the shared base for the ML Engineer, AI Engineer and Computer Vision Engineer paths.

1. **Programming** — You can write, test and debug a Python program on your own.
   - [CS50's Introduction to Programming with Python](https://cs50.harvard.edu/python/)
   - *Go deeper:* [CS50's Introduction to Computer Science](https://cs50.harvard.edu/x/) · [6.100L Introduction to CS and Programming using Python](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/) · [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/) · [Think Python](https://allendowney.github.io/ThinkPython/) · [Python for Everybody](https://www.py4e.com/)
2. **Data Structures & Algorithms** — You can implement common data structures and algorithms, analyze their running time, and choose the right one for a problem.
   - [6.006 Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
   - *Go deeper:* [Algorithms, Part I](https://www.coursera.org/learn/algorithms-part1)
3. **Python for Data** — You can work with NumPy arrays, and load, clean, explore and plot a dataset with pandas in a notebook.
   - [Python Programming for Economics and Finance](https://python-programming.quantecon.org/intro.html)
   - [Kaggle Learn: Pandas](https://www.kaggle.com/learn/pandas)
   - *Go deeper:* [Elements of Data Science](https://allendowney.github.io/ElementsOfDataScience/) · [Kaggle Learn: Python](https://www.kaggle.com/learn/python) · [Kaggle Learn: Data Visualization](https://www.kaggle.com/learn/data-visualization) · [100 numpy exercises](https://github.com/rougier/numpy-100) · [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/) · [Python for Data Analysis, 3E](https://wesmckinney.com/book/) · [NumPy: the absolute basics for beginners](https://numpy.org/doc/stable/user/absolute_beginners.html)
4. **Math** — You can work with vectors, matrices, derivatives, partial derivatives and gradients, probability and basic statistics.
   - [Precalculus](https://www.khanacademy.org/math/precalculus)
   - [Differential Calculus](https://www.khanacademy.org/math/differential-calculus)
   - [Statistics and probability](https://www.khanacademy.org/math/statistics-probability)
   - [Linear algebra](https://www.khanacademy.org/math/linear-algebra)
   - [Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra)
   - [Multivariable calculus](https://www.khanacademy.org/math/multivariable-calculus)
   - *Go deeper:* [MIT 6.041SC — Probabilistic Systems Analysis and Applied Probability](https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/) · [Essence of Calculus](https://www.3blue1brown.com/topics/calculus) · [18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/) · [18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/) · [18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/) · [Mathematics for Machine Learning](https://mml-book.github.io/) · [Mathematics for Machine Learning and Data Science](https://www.deeplearning.ai/specializations/mathematics-for-machine-learning-and-data-science/) · [Think Stats](https://allendowney.github.io/ThinkStats/) · [Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/)
5. **Core Machine Learning** — You can train, evaluate and compare regression and classification models.
   - [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
   - *Go deeper:* [Machine Learning Zoomcamp](https://github.com/DataTalksClub/machine-learning-zoomcamp) · [Machine Learning Specialization](https://www.deeplearning.ai/specializations/machine-learning/) · [CS229: Machine Learning](https://cs229.stanford.edu/) · [UC Berkeley CS189/289A — Introduction to Machine Learning](https://people.eecs.berkeley.edu/~jrs/189/) · [6.036 Introduction to Machine Learning](https://openlearninglibrary.mit.edu/courses/course-v1:MITx+6.036+1T2019/about) · [An Introduction to Statistical Learning with Applications in Python](https://www.statlearning.com/) · [Kaggle Learn: Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning) · [Data 100: Principles and Techniques of Data Science](https://ds100.org/) · [Learning From Data](https://work.caltech.edu/telecourse) · [CS4780: Machine Learning for Intelligent Systems](https://www.cs.cornell.edu/courses/cs4780/2018fa/)
6. **Neural Networks** — You can implement backpropagation from scratch and build a small GPT.
   - [Neural Networks](https://www.3blue1brown.com/topics/neural-networks)
   - [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)
   - *Go deeper:* [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) · [The Little Book of Deep Learning](https://fleuret.org/francois/lbdl.html) · [AI Engineering from Scratch](https://aiengineeringfromscratch.com/)

### ML Engineer

Train, ship and run models in production, and prepare for ML engineering interviews. Start after Foundations.

1. **Deep Learning** — You can train an image or text model in PyTorch, explain each step, and explain how attention works.
   - [Practical Deep Learning for Coders](https://course.fast.ai/)
   - [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
   - *Go deeper:* [PyTorch Tutorials](https://docs.pytorch.org/tutorials/) · [Dive into Deep Learning](https://d2l.ai/) · [MIT 6.S191 — Introduction to Deep Learning](https://introtodeeplearning.com/) · [Deep Learning Specialization](https://www.deeplearning.ai/specializations/deep-learning/) · [Understanding Deep Learning](https://udlbook.github.io/udlbook/) · [UvA Deep Learning Tutorials](https://uvadlc-notebooks.readthedocs.io/en/latest/) · [Deep Learning: Foundations and Concepts](https://www.bishopbook.com/)
2. **Deployment & MLOps** — You can deploy a model, track experiments and monitor it in production.
   - [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp)
   - *Go deeper:* [MLOps: Continuous delivery and automation pipelines in machine learning](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning) · [The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction](https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/)
3. **ML System Design** — You can design an ML system end to end and explain its trade-offs.
   - [CMU 17-445/645 — Machine Learning in Production](https://mlip-cmu.github.io/)
   - *Go deeper:* [CS 329S: Machine Learning Systems Design](https://stanford-cs329s.github.io/) · [Designing Machine Learning Systems](https://github.com/chiphuyen/dmls-book) · [Hidden Technical Debt in Machine Learning Systems](https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html) · [Rules of Machine Learning: Best Practices for ML Engineering](https://developers.google.com/machine-learning/guides/rules-of-ml)
4. **Portfolio Project** — You can take one model from raw data to a deployed, tested service, show where it fails, and explain your trade-offs.
   - [Made With ML — MLOps](https://madewithml.com/courses/mlops/)
5. **Interview Prep** — You can solve timed coding problems on data structures and algorithms, and answer ML knowledge and system design questions under time pressure. You have 3–5 STAR stories ready that show what you did on a team, the result in numbers, and what you learned.
   - [Tech Interview Handbook](https://www.techinterviewhandbook.org/)
   - [Introduction to Machine Learning Interviews Book](https://huyenchip.com/ml-interviews-book/)
   - [Machine Learning Q and AI](https://sebastianraschka.com/books/ml-q-and-ai/)
   - *Go deeper:* [6.006 Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) · [Deep Learning Interviews](https://arxiv.org/abs/2201.00650) · [StaffML](https://mlsysbook.ai/staffml/) · [Stanford CS 229 Machine Learning Cheatsheets](https://stanford.edu/~shervine/teaching/cs-229/)

## AI Foundations

What AI is and the classic ideas behind it: search, planning, reasoning, probability.

- [AI Fluency: Framework and foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations) - Anthropic, Joseph Feller, Rick Dakan. <sub>course</sub>
- [AI for Everyone](https://www.deeplearning.ai/courses/ai-for-everyone/) - DeepLearning.AI, Andrew Ng. <sub>course · beginner · ~7 h</sub>
- [CS 188 Introduction to Artificial Intelligence](https://inst.eecs.berkeley.edu/~cs188/) - UC Berkeley, Emma Pierson, Peyrin Kao. <sub>course</sub>
- [CS221: Artificial Intelligence: Principles and Techniques](https://cs221.stanford.edu/) - Stanford, Percy Liang. <sub>course</sub>
- [CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/) - Harvard, Brian Yu, David J. Malan. <sub>course</sub>
- [Elements of AI](https://www.elementsofai.com/) - University of Helsinki, MinnaLearn. <sub>course</sub>
- [MIT 6.034 — Artificial Intelligence](https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/) - MIT OpenCourseWare, Patrick Henry Winston. <sub>course</sub>

## Machine Learning

Learning from data: models, training, evaluation, generalization.

- [18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/) - MIT OpenCourseWare, Gilbert Strang. <sub>course</sub>
- [6.036 Introduction to Machine Learning](https://openlearninglibrary.mit.edu/courses/course-v1:MITx+6.036+1T2019/about) - MIT Open Learning Library, MIT. <sub>course</sub>
- [CS 228 - Probabilistic Graphical Models](https://ermongroup.github.io/cs228/) - Stanford, Stefano Ermon. <sub>course</sub>
- [CS221: Artificial Intelligence: Principles and Techniques](https://cs221.stanford.edu/) - Stanford, Percy Liang. <sub>course</sub>
- [CS229: Machine Learning](https://cs229.stanford.edu/) - Stanford, Jehangir Amjad, Anand Avati. <sub>course</sub>
- [CS4780: Machine Learning for Intelligent Systems](https://www.cs.cornell.edu/courses/cs4780/2018fa/) - Cornell University, Kilian Weinberger. <sub>course</sub>
- [CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/) - Harvard, Brian Yu, David J. Malan. <sub>course</sub>
- [Data 100: Principles and Techniques of Data Science](https://ds100.org/) - UC Berkeley, UC Berkeley Data 100 staff. <sub>course</sub>
- [Introduction to GenAI and ML 2025 Fall](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php) - 國立臺灣大學, 李宏毅. <sub>course · beginner · zh-TW</sub>
- [Kaggle Learn: Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning) - Kaggle, Dan Becker. <sub>course · ~3 h</sub>
- [Learning From Data](https://work.caltech.edu/telecourse) - Caltech, Yaser Abu-Mostafa. <sub>course</sub>
- [Machine Learning 2019 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2019-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2020 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2020-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2021 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2021-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2022 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2022-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2023 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2023-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2025 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2026 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning and having it deep and structured 2018 Spring](https://speech.ee.ntu.edu.tw/~hylee/mlds/2018-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) - Google. <sub>course · ~14 h</sub>
- [Machine Learning Specialization](https://www.deeplearning.ai/specializations/machine-learning/) - DeepLearning.AI, Stanford Online, Andrew Ng. <sub>course · beginner · ~95 h</sub>
- [Machine Learning Zoomcamp](https://github.com/DataTalksClub/machine-learning-zoomcamp) - DataTalks.Club. <sub>course</sub>
- [UC Berkeley CS189/289A — Introduction to Machine Learning](https://people.eecs.berkeley.edu/~jrs/189/) - UC Berkeley, Jonathan Shewchuk. <sub>course · ~38 h</sub>
- [An Introduction to Statistical Learning with Applications in Python](https://www.statlearning.com/) - Stanford University, Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani, Jonathan Taylor. <sub>book</sub>
- [Introduction to Machine Learning Interviews Book](https://huyenchip.com/ml-interviews-book/) - Chip Huyen. <sub>book</sub>
- [Machine Learning Q and AI](https://sebastianraschka.com/books/ml-q-and-ai/) - Sebastian Raschka. <sub>book</sub>
- [Machine Learning FAQ](https://sebastianraschka.com/faq/) - Sebastian Raschka. <sub>article</sub>
- [Stanford CS 229 Machine Learning Cheatsheets](https://stanford.edu/~shervine/teaching/cs-229/) - Stanford University, Afshine Amidi, Shervine Amidi. <sub>article</sub>

## Deep Learning

Neural networks, how they are trained, and the architectures that work.

- [AI Engineering from Scratch](https://aiengineeringfromscratch.com/) - Rohit Ghumare. <sub>course · ~342 h · 20 units</sub>
  - [Phase 0: Setup & Tooling (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/00-setup-and-tooling) <sub>github</sub>
  - [Phase 1: Math Foundations (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/01-math-foundations) <sub>github</sub>
  - [Phase 2: ML Fundamentals (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/02-ml-fundamentals) <sub>github</sub>
  - [Phase 3: Deep Learning Core (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/03-deep-learning-core) <sub>github</sub>
  - [Phase 4: Computer Vision (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/04-computer-vision) <sub>github</sub>
  - [Phase 5: NLP, Foundations to Advanced (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/05-nlp-foundations-to-advanced) <sub>github</sub>
  - [Phase 6: Speech & Audio (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/06-speech-and-audio) <sub>github</sub>
  - [Phase 7: Transformers Deep Dive (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/07-transformers-deep-dive) <sub>github</sub>
  - [Phase 8: Generative AI (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/08-generative-ai) <sub>github</sub>
  - [Phase 9: Reinforcement Learning (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/09-reinforcement-learning) <sub>github</sub>
  - [Phase 10: LLMs from Scratch (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/10-llms-from-scratch) <sub>github</sub>
  - [Phase 11: LLM Engineering (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/11-llm-engineering) <sub>github</sub>
  - [Phase 12: Multimodal AI (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/12-multimodal-ai) <sub>github</sub>
  - [Phase 13: Tools & Protocols (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/13-tools-and-protocols) <sub>github</sub>
  - [Phase 14: Agent Engineering (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/14-agent-engineering) <sub>github</sub>
  - [Phase 15: Autonomous Systems (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/15-autonomous-systems) <sub>github</sub>
  - [Phase 16: Multi-Agent & Swarms (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/16-multi-agent-and-swarms) <sub>github</sub>
  - [Phase 17: Infrastructure & Production (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/17-infrastructure-and-production) <sub>github</sub>
  - [Phase 18: Ethics, Safety & Alignment (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/18-ethics-safety-alignment) <sub>github</sub>
  - [Phase 19: Capstone Projects (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/19-capstone-projects) <sub>github</sub>
- [CME 295 - Transformers & Large Language Models (Autumn 2025)](https://cme295.stanford.edu/syllabus/2025/) - Stanford, Afshine Amidi, Shervine Amidi. <sub>course · ~16 h</sub>
- [CME 295 - Transformers & Large Language Models (Autumn 2026)](https://cme295.stanford.edu/) - Stanford, Afshine Amidi, Shervine Amidi. <sub>course</sub>
- [CMU 11-785 — Introduction to Deep Learning](https://deeplearning.cs.cmu.edu/) - CMU. <sub>course</sub>
- [CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n/) - Stanford, Diyi Yang, Yejin Choi. <sub>course</sub>
- [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/) - Stanford University, Fei-Fei Li, Ehsan Adeli, Justin Johnson, Zane Durante, Tiange Xiang. <sub>course · ~27 h</sub>
- [CS236: Deep Generative Models](https://cs236.stanford.edu/) - Stanford, Stefano Ermon. <sub>course</sub>
- [CS25: Transformers United](https://web.stanford.edu/class/cs25/) - Stanford. <sub>course</sub>
- [Deep Learning for Computer Vision](https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r) - University of Michigan. <sub>course · ~26 h</sub>
- [Deep Learning for Human Language Processing 2020 Spring](https://speech.ee.ntu.edu.tw/~hylee/dlhlp/2020-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Deep Learning Specialization](https://www.deeplearning.ai/specializations/deep-learning/) - DeepLearning.AI, Andrew Ng. <sub>course · intermediate · ~127 h</sub>
- [Deep Learning Systems: Algorithms and Implementation](https://dlsyscourse.org/) - CMU, Tim Dettmers, Tianqi Chen. <sub>course</sub>
- [Free Computer Vision Courses](https://opencv.org/university/free-courses/) - OpenCV.org. <sub>course · 5 units</sub>
- [Hugging Face Audio course](https://huggingface.co/learn/audio-course) - Hugging Face, Sanchit Gandhi, Matthijs Hollemans, Maria Khalusova, Vaibhav Srivastav. <sub>course</sub>
- [Machine Learning 2019 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2019-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2020 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2020-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2021 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2021-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2022 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2022-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2023 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2023-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning and having it deep and structured 2018 Spring](https://speech.ee.ntu.edu.tw/~hylee/mlds/2018-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [MIT 6.5940 — TinyML and Efficient Deep Learning Computing](https://hanlab.mit.edu/courses/2024-fall-65940) - MIT, Song Han. <sub>course</sub>
- [MIT 6.S191 — Introduction to Deep Learning](https://introtodeeplearning.com/) - MIT OpenCourseWare, Alexander Amini, Ava Soleimany. <sub>course · beginner</sub>
- [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) - Andrej Karpathy. <sub>course · ~15 h</sub>
- [Practical Deep Learning for Coders](https://course.fast.ai/) - fast.ai, Jeremy Howard. <sub>course · ~14 h</sub>
- [Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion](https://course.fast.ai/Lessons/part2.html) - fast.ai, Jeremy Howard. <sub>course · ~30 h</sub>
- [UvA Deep Learning Tutorials](https://uvadlc-notebooks.readthedocs.io/en/latest/) - University of Amsterdam, Phillip Lippe. <sub>course</sub>
- [Deep Learning](https://www.deeplearningbook.org/) - MIT Press, Goodfellow, Bengio & Courville. <sub>book</sub>
- [Deep Learning Interviews](https://arxiv.org/abs/2201.00650) - Shlomo Kashani, Amir Ivry. <sub>book</sub>
- [Deep Learning: Foundations and Concepts](https://www.bishopbook.com/) - Christopher M. Bishop, Christopher M. Bishop, Hugh Bishop. <sub>book</sub>
- [Dive into Deep Learning](https://d2l.ai/) - D2L.ai, Zhang, Lipton, Li, Smola. <sub>book</sub>
- [Machine Learning Q and AI](https://sebastianraschka.com/books/ml-q-and-ai/) - Sebastian Raschka. <sub>book</sub>
- [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) - Determination Press, Michael Nielsen. <sub>book</sub>
- [The Little Book of Deep Learning](https://fleuret.org/francois/lbdl.html) - François Fleuret. <sub>book</sub>
- [Understanding Deep Learning](https://udlbook.github.io/udlbook/) - The MIT Press, Simon J.D. Prince. <sub>book</sub>
- [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929) - arXiv, Dosovitskiy et al. <sub>paper</sub>
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - arXiv, Vaswani et al. <sub>paper</sub>
- [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/abs/1502.03167) - arXiv, Ioffe & Szegedy. <sub>paper</sub>
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) - arXiv, He et al. <sub>paper</sub>
- [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020) - arXiv, Radford et al. <sub>paper</sub>
- [PyTorch Tutorials](https://docs.pytorch.org/tutorials/) - PyTorch, PyTorch Team. <sub>docs</sub>
- [Neural Networks](https://www.3blue1brown.com/topics/neural-networks) - 3Blue1Brown, Grant Sanderson. <sub>video</sub>
- [Deconvolution and Checkerboard Artifacts](https://distill.pub/2016/deconv-checkerboard/) - Distill, Odena et al. <sub>article</sub>
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - Jay Alammar. <sub>article</sub>
- [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) - Lil'Log, Lilian Weng. <sub>article · 31 min</sub>
- [Build a Large Language Model (From Scratch)](https://github.com/rasbt/LLMs-from-scratch) - Manning, Sebastian Raschka. <sub>github</sub>

## Computer Vision

Getting machines to understand images and video.

- [16-824: Visual Learning and Recognition](https://visual-learning.cs.cmu.edu/) - Carnegie Mellon University, Jun-Yan Zhu. <sub>course</sub>
- [Community Computer Vision Course](https://huggingface.co/learn/computer-vision-course/unit0/welcome/welcome) - Hugging Face, Hugging Face Community. <sub>course · beginner</sub>
- [CS131: Computer Vision: Foundations and Applications](https://stanford-cs131.github.io/winter2025/) - Stanford University, Juan Carlos Niebles, Adrien Gaidon, Silvio Savarese. <sub>course</sub>
- [CS180/280A: Intro to Computer Vision and Computational Photography](https://cal-cs180.github.io/fa25/) - UC Berkeley, Alexei Efros. <sub>course</sub>
- [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/) - Stanford University, Fei-Fei Li, Ehsan Adeli, Justin Johnson, Zane Durante, Tiange Xiang. <sub>course · ~27 h</sub>
- [Deep Learning for Computer Vision](https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r) - University of Michigan. <sub>course · ~26 h</sub>
- [First Principles of Computer Vision](https://fpcv.cs.columbia.edu/) - Columbia University, Shree Nayar. <sub>course</sub>
- [Free Computer Vision Courses](https://opencv.org/university/free-courses/) - OpenCV.org. <sub>course · 5 units</sub>
- [Computer Vision: Algorithms and Applications, 2nd ed.](https://szeliski.org/Book/) - Richard Szeliski. <sub>book</sub>
- [Foundations of Computer Vision](https://visionbook.mit.edu/) - MIT Press, Antonio Torralba, Phillip Isola, William Freeman. <sub>book</sub>
- [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929) - arXiv, Dosovitskiy et al. <sub>paper</sub>
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) - arXiv, He et al. <sub>paper</sub>
- [Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks](https://arxiv.org/abs/1506.01497) - arXiv, Shaoqing Ren, Kaiming He, Ross Girshick, Jian Sun. <sub>paper</sub>
- [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020) - arXiv, Radford et al. <sub>paper</sub>
- [Mask R-CNN](https://arxiv.org/abs/1703.06870) - arXiv, Kaiming He, Georgia Gkioxari, Piotr Dollár, Ross Girshick. <sub>paper</sub>
- [MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications](https://arxiv.org/abs/1704.04861) - arXiv, Andrew G. Howard et al. <sub>paper</sub>
- [Segment Anything](https://arxiv.org/abs/2304.02643) - arXiv, Alexander Kirillov et al. <sub>paper</sub>
- [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597) - arXiv, Olaf Ronneberger, Philipp Fischer, Thomas Brox. <sub>paper</sub>
- [You Only Look Once: Unified, Real-Time Object Detection](https://arxiv.org/abs/1506.02640) - arXiv, Joseph Redmon, Santosh Divvala, Ross Girshick, Ali Farhadi. <sub>paper</sub>
- [Deconvolution and Checkerboard Artifacts](https://distill.pub/2016/deconv-checkerboard/) - Distill, Odena et al. <sub>article</sub>
- [Fine-Tuning Object Detection Model on a Custom Dataset, Deployment in Spaces, and Gradio API Integration](https://huggingface.co/learn/cookbook/fine_tuning_detr_custom_dataset) - Hugging Face, Sergio Paniego. <sub>article</sub>

## NLP

Natural language processing: text and speech, from classic methods to Transformers.

- [CMU 11-711 — Advanced Natural Language Processing](https://cmu-l3.github.io/anlp-spring2026/) - Carnegie Mellon University, Sean Welleck. <sub>course</sub>
- [CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n/) - Stanford, Diyi Yang, Yejin Choi. <sub>course</sub>
- [Deep Learning for Human Language Processing 2020 Spring](https://speech.ee.ntu.edu.tw/~hylee/dlhlp/2020-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Hugging Face Audio course](https://huggingface.co/learn/audio-course) - Hugging Face, Sanchit Gandhi, Matthijs Hollemans, Maria Khalusova, Vaibhav Srivastav. <sub>course</sub>
- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) - Hugging Face. <sub>course</sub>
- [NLP Course | For You](https://lena-voita.github.io/nlp_course.html) - Lena Voita. <sub>course</sub>
- [Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/) - Stanford University, Christopher D. Manning, Prabhakar Raghavan, Hinrich Schütze. <sub>book</sub>
- [Speech and Language Processing (3rd ed. draft)](https://web.stanford.edu/~jurafsky/slp3/) - Stanford University, Dan Jurafsky, James H. Martin. <sub>book</sub>
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - arXiv, Vaswani et al. <sub>paper</sub>
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) - arXiv, Lewis et al. <sub>paper</sub>
- [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/) - Harvard NLP, Sasha Rush, Austin Huang, Suraj Subramanian, Jonathan Sum, Khalid Almubarak, Stella Biderman. <sub>article</sub>
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - Jay Alammar. <sub>article</sub>

## LLMs

Large language models: how they are built, trained, adapted and prompted.

- [AI Engineering from Scratch](https://aiengineeringfromscratch.com/) - Rohit Ghumare. <sub>course · ~342 h · 20 units</sub>
  - [Phase 0: Setup & Tooling (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/00-setup-and-tooling) <sub>github</sub>
  - [Phase 1: Math Foundations (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/01-math-foundations) <sub>github</sub>
  - [Phase 2: ML Fundamentals (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/02-ml-fundamentals) <sub>github</sub>
  - [Phase 3: Deep Learning Core (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/03-deep-learning-core) <sub>github</sub>
  - [Phase 4: Computer Vision (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/04-computer-vision) <sub>github</sub>
  - [Phase 5: NLP, Foundations to Advanced (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/05-nlp-foundations-to-advanced) <sub>github</sub>
  - [Phase 6: Speech & Audio (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/06-speech-and-audio) <sub>github</sub>
  - [Phase 7: Transformers Deep Dive (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/07-transformers-deep-dive) <sub>github</sub>
  - [Phase 8: Generative AI (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/08-generative-ai) <sub>github</sub>
  - [Phase 9: Reinforcement Learning (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/09-reinforcement-learning) <sub>github</sub>
  - [Phase 10: LLMs from Scratch (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/10-llms-from-scratch) <sub>github</sub>
  - [Phase 11: LLM Engineering (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/11-llm-engineering) <sub>github</sub>
  - [Phase 12: Multimodal AI (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/12-multimodal-ai) <sub>github</sub>
  - [Phase 13: Tools & Protocols (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/13-tools-and-protocols) <sub>github</sub>
  - [Phase 14: Agent Engineering (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/14-agent-engineering) <sub>github</sub>
  - [Phase 15: Autonomous Systems (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/15-autonomous-systems) <sub>github</sub>
  - [Phase 16: Multi-Agent & Swarms (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/16-multi-agent-and-swarms) <sub>github</sub>
  - [Phase 17: Infrastructure & Production (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/17-infrastructure-and-production) <sub>github</sub>
  - [Phase 18: Ethics, Safety & Alignment (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/18-ethics-safety-alignment) <sub>github</sub>
  - [Phase 19: Capstone Projects (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/19-capstone-projects) <sub>github</sub>
- [AI Fluency: Framework and foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations) - Anthropic, Joseph Feller, Rick Dakan. <sub>course</sub>
- [CME 295 - Transformers & Large Language Models (Autumn 2025)](https://cme295.stanford.edu/syllabus/2025/) - Stanford, Afshine Amidi, Shervine Amidi. <sub>course · ~16 h</sub>
- [CME 295 - Transformers & Large Language Models (Autumn 2026)](https://cme295.stanford.edu/) - Stanford, Afshine Amidi, Shervine Amidi. <sub>course</sub>
- [CMU 11-711 — Advanced Natural Language Processing](https://cmu-l3.github.io/anlp-spring2026/) - Carnegie Mellon University, Sean Welleck. <sub>course</sub>
- [CS 224V Agentic AI](https://cs224v.stanford.edu/) - Stanford, Monica Lam. <sub>course</sub>
- [CS25: Transformers United](https://web.stanford.edu/class/cs25/) - Stanford. <sub>course</sub>
- [CS329A Self-Improving AI Agents](https://cs329a.stanford.edu/) - Stanford, Aakanksha Chowdhery, Azalia Mirhoseini. <sub>course</sub>
- [CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) - Stanford, Tatsunori Hashimoto, Percy Liang. <sub>course</sub>
- [Generative AI for Beginners](https://microsoft.github.io/generative-ai-for-beginners/) - Microsoft, Microsoft Cloud Advocates. <sub>course</sub>
- [Generative AI with Large Language Models](https://www.deeplearning.ai/courses/generative-ai-with-llms/) - DeepLearning.AI, Antje Barth, Chris Fregly, Shelbee Eigenbrode, Mike Chambers. <sub>course · intermediate · ~13 h</sub>
- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) - Hugging Face. <sub>course</sub>
- [Hugging Face smol-course](https://huggingface.co/learn/smol-course/unit0/1) - Hugging Face, Ben Burtenshaw. <sub>course</sub>
- [Introduction to GenAI and ML 2025 Fall](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php) - 國立臺灣大學, 李宏毅. <sub>course · beginner · zh-TW</sub>
- [Introduction to Generative AI 2024 Spring](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · 20 units · zh-TW</sub>
- [Large Language Model Systems](https://llmsystem.github.io/) - CMU, Lei Li. <sub>course</sub>
- [LLM Zoomcamp](https://github.com/DataTalksClub/llm-zoomcamp) - DataTalks.Club, Alexey Grigorev. <sub>course</sub>
- [Machine Learning 2025 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Machine Learning 2026 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) - Andrej Karpathy. <sub>course · ~15 h</sub>
- [OpenAI Academy — Builders](https://academy.openai.com/public/clubs/builders-etkn1/overview) - OpenAI, OpenAI Academy. <sub>course</sub>
- [OpenAI Builder Bootcamp 2026](https://academy.openai.com/public/clubs/builders-etkn1/resources/builder-bootcamp-2026-04-22) - OpenAI, OpenAI Academy. <sub>course</sub>
- [The Context Course](https://huggingface.co/learn/context-course/unit0/introduction) - Hugging Face, Ben Burtenshaw, Atin Kumar Singh, Maya Nielan, Ryan Whitehead. <sub>course</sub>
- [AI Engineering](https://github.com/chiphuyen/aie-book) - O'Reilly, Chip Huyen. <sub>book</sub>
- [Foundations of Large Language Models](https://arxiv.org/abs/2501.09223) - arXiv, Tong Xiao, Jingbo Zhu. <sub>book</sub>
- [Reinforcement Learning from Human Feedback and LLM Post-Training](https://rlhfbook.com/) - Nathan Lambert. <sub>book</sub>
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - arXiv, Vaswani et al. <sub>paper</sub>
- [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290) - arXiv, Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon et al. <sub>paper</sub>
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685) - arXiv, Hu et al. <sub>paper</sub>
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) - arXiv, Lewis et al. <sub>paper</sub>
- [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155) - arXiv, Long Ouyang et al. <sub>paper</sub>
- [Prompt Engineering Guide](https://www.promptingguide.ai) - DAIR.AI. <sub>docs</sub>
- [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) - Anthropic. <sub>docs</sub>
- [Building A Generative AI Platform](https://huyenchip.com/2024/07/25/genai-platform.html) - Chip Huyen. <sub>article</sub>
- [Patterns for Building LLM-based Systems & Products](https://eugeneyan.com/writing/llm-patterns/) - Eugene Yan. <sub>article · ~1.1 h</sub>
- [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/) - Harvard NLP, Sasha Rush, Austin Huang, Suraj Subramanian, Jonathan Sum, Khalid Almubarak, Stella Biderman. <sub>article</sub>
- [The LLM Evaluation Guidebook](https://huggingface.co/spaces/OpenEvals/evaluation-guidebook) - Hugging Face, Clémentine Fourrier, Thibaud Frere, Guilherme Penedo, Thomas Wolf. <sub>article</sub>
- [The Ultra-Scale Playbook: Training LLMs on GPU Clusters](https://huggingface.co/spaces/nanotron/ultrascale-playbook) - Hugging Face, Nouamane Tazi, Ferdinand Mom, Haojun Zhao, Phuc Nguyen, Mohamed Mekkouri, Leandro von Werra, Thomas Wolf. <sub>article</sub>
- [What We've Learned From A Year of Building with LLMs](https://applied-llms.org/) - Applied LLMs, Eugene Yan, Bryan Bischof, Charles Frye, Hamel Husain, Jason Liu, Shreya Shankar. <sub>article</sub>
- [AI Engineering Interview Questions Company Wise](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise) - Outcome School, Pallavi. <sub>github</sub>
- [Build a Large Language Model (From Scratch)](https://github.com/rasbt/LLMs-from-scratch) - Manning, Sebastian Raschka. <sub>github</sub>
- [Transformers & LLMs cheatsheet for Stanford's CME 295](https://github.com/afshinea/stanford-cme-295-transformers-large-language-models/tree/main/en) - Stanford University, Afshine Amidi, Shervine Amidi. <sub>github</sub>
- [斯坦福大学 CME 295 课程：Transformer 与大语言模型速查表](https://github.com/afshinea/stanford-cme-295-transformers-large-language-models/tree/main/zh) - Stanford, Afshine Amidi, Shervine Amidi. <sub>github · zh-CN</sub>

## Generative AI

Models that generate: diffusion, VAEs, GANs, and building products on them.

- [CS236: Deep Generative Models](https://cs236.stanford.edu/) - Stanford, Stefano Ermon. <sub>course</sub>
- [Generative AI for Beginners](https://microsoft.github.io/generative-ai-for-beginners/) - Microsoft, Microsoft Cloud Advocates. <sub>course</sub>
- [Generative AI with Large Language Models](https://www.deeplearning.ai/courses/generative-ai-with-llms/) - DeepLearning.AI, Antje Barth, Chris Fregly, Shelbee Eigenbrode, Mike Chambers. <sub>course · intermediate · ~13 h</sub>
- [Introduction to GenAI and ML 2025 Fall](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php) - 國立臺灣大學, 李宏毅. <sub>course · beginner · zh-TW</sub>
- [Introduction to Generative AI 2024 Spring](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · 20 units · zh-TW</sub>
- [MIT 6.S184 — Introduction to Flow Matching and Diffusion Models](https://diffusion.csail.mit.edu/) - MIT, Peter Holderrieth, Ezra Erives. <sub>course</sub>
- [Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion](https://course.fast.ai/Lessons/part2.html) - fast.ai, Jeremy Howard. <sub>course · ~30 h</sub>
- [AI Engineering](https://github.com/chiphuyen/aie-book) - O'Reilly, Chip Huyen. <sub>book</sub>
- [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239) - arXiv, Jonathan Ho, Ajay Jain, Pieter Abbeel. <sub>paper</sub>
- [Understanding Diffusion Models: A Unified Perspective](https://arxiv.org/abs/2208.11970) - arXiv, Calvin Luo. <sub>paper</sub>
- [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) - Lil'Log, Lilian Weng. <sub>article · 31 min</sub>

## AI Agents

LLM systems that plan, use tools and act — and how to evaluate and govern them.

- [Agentic AI MOOC](https://agenticai-learning.org/f25) - UC Berkeley, Dawn Song. <sub>course</sub>
- [AI Agents in LangGraph](https://www.deeplearning.ai/courses/ai-agents-in-langgraph/) - DeepLearning.AI, Harrison Chase, Rotem Weiss. <sub>course · intermediate · ~1.7 h</sub>
- [AI Dev Tools Zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp) - DataTalks.Club, Alexey Grigorev, Bhavani Ravi, Moein Foroughi. <sub>course</sub>
- [AI Engineering from Scratch](https://aiengineeringfromscratch.com/) - Rohit Ghumare. <sub>course · ~342 h · 20 units</sub>
  - [Phase 0: Setup & Tooling (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/00-setup-and-tooling) <sub>github</sub>
  - [Phase 1: Math Foundations (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/01-math-foundations) <sub>github</sub>
  - [Phase 2: ML Fundamentals (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/02-ml-fundamentals) <sub>github</sub>
  - [Phase 3: Deep Learning Core (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/03-deep-learning-core) <sub>github</sub>
  - [Phase 4: Computer Vision (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/04-computer-vision) <sub>github</sub>
  - [Phase 5: NLP, Foundations to Advanced (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/05-nlp-foundations-to-advanced) <sub>github</sub>
  - [Phase 6: Speech & Audio (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/06-speech-and-audio) <sub>github</sub>
  - [Phase 7: Transformers Deep Dive (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/07-transformers-deep-dive) <sub>github</sub>
  - [Phase 8: Generative AI (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/08-generative-ai) <sub>github</sub>
  - [Phase 9: Reinforcement Learning (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/09-reinforcement-learning) <sub>github</sub>
  - [Phase 10: LLMs from Scratch (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/10-llms-from-scratch) <sub>github</sub>
  - [Phase 11: LLM Engineering (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/11-llm-engineering) <sub>github</sub>
  - [Phase 12: Multimodal AI (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/12-multimodal-ai) <sub>github</sub>
  - [Phase 13: Tools & Protocols (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/13-tools-and-protocols) <sub>github</sub>
  - [Phase 14: Agent Engineering (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/14-agent-engineering) <sub>github</sub>
  - [Phase 15: Autonomous Systems (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/15-autonomous-systems) <sub>github</sub>
  - [Phase 16: Multi-Agent & Swarms (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/16-multi-agent-and-swarms) <sub>github</sub>
  - [Phase 17: Infrastructure & Production (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/17-infrastructure-and-production) <sub>github</sub>
  - [Phase 18: Ethics, Safety & Alignment (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/18-ethics-safety-alignment) <sub>github</sub>
  - [Phase 19: Capstone Projects (GitHub)](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/19-capstone-projects) <sub>github</sub>
- [Building agents](https://developers.openai.com/tracks/building-agents) - OpenAI. <sub>course · beginner</sub>
- [CS 224V Agentic AI](https://cs224v.stanford.edu/) - Stanford, Monica Lam. <sub>course</sub>
- [CS329A Self-Improving AI Agents](https://cs329a.stanford.edu/) - Stanford, Aakanksha Chowdhery, Azalia Mirhoseini. <sub>course</sub>
- [Evaluating AI Agents](https://www.deeplearning.ai/courses/evaluating-ai-agents/) - DeepLearning.AI, John Gilhuly, Aman Khan. <sub>course · beginner · ~2.6 h</sub>
- [Governing AI Agents](https://www.deeplearning.ai/courses/governing-ai-agents/) - DeepLearning.AI, Amber Roberts. <sub>course · beginner · ~1.5 h</sub>
- [Hugging Face AI Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction) - Hugging Face, Ben Burtenshaw, Sergio Paniego. <sub>course</sub>
- [Multi AI Agent Systems with crewAI](https://www.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai/) - DeepLearning.AI, João Moura. <sub>course · beginner · ~3 h</sub>
- [OpenAI Academy — Builders](https://academy.openai.com/public/clubs/builders-etkn1/overview) - OpenAI, OpenAI Academy. <sub>course</sub>
- [OpenAI Builder Bootcamp 2026](https://academy.openai.com/public/clubs/builders-etkn1/resources/builder-bootcamp-2026-04-22) - OpenAI, OpenAI Academy. <sub>course</sub>
- [The Context Course](https://huggingface.co/learn/context-course/unit0/introduction) - Hugging Face, Ben Burtenshaw, Atin Kumar Singh, Maya Nielan, Ryan Whitehead. <sub>course</sub>
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) - arXiv, Shunyu Yao et al. <sub>paper</sub>
- [OpenAI — Agents](https://developers.openai.com/api/docs/guides/agents) - OpenAI. <sub>docs</sub>
- [Agents](https://huyenchip.com/2025/01/07/agents.html) - Chip Huyen. <sub>article</sub>
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic, Erik S., Barry Zhang. <sub>article</sub>
- [LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) - Lil'Log, Lilian Weng. <sub>article · 31 min</sub>
- [AI Engineering Interview Questions Company Wise](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise) - Outcome School, Pallavi. <sub>github</sub>

## Reinforcement Learning

Learning by acting: rewards, policies, value functions.

- [Deep Reinforcement Learning Course](https://huggingface.co/learn/deep-rl-course) - Hugging Face, Thomas Simonini, Omar Sanseviero, Sayak Paul. <sub>course</sub>

## MLOps

Taking models to production: data, deployment, monitoring, iteration.

- [CMU 17-445/645 — Machine Learning in Production](https://mlip-cmu.github.io/) - Carnegie Mellon University, Christian Kästner, Bogdan Vasilescu. <sub>course</sub>
- [CS 329S: Machine Learning Systems Design](https://stanford-cs329s.github.io/) - Stanford, Chip Huyen. <sub>course</sub>
- [Machine Learning in Production](https://www.deeplearning.ai/courses/machine-learning-in-production/) - DeepLearning.AI, Andrew Ng. <sub>course · intermediate · ~11 h</sub>
- [Made With ML — MLOps](https://madewithml.com/courses/mlops/) - Made With ML, Goku Mohandas. <sub>course</sub>
- [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) - DataTalks.Club, Alexey Grigorev. <sub>course</sub>
- [AI Engineering](https://github.com/chiphuyen/aie-book) - O'Reilly, Chip Huyen. <sub>book</sub>
- [Designing Machine Learning Systems](https://github.com/chiphuyen/dmls-book) - O'Reilly, Chip Huyen. <sub>book</sub>
- [Machine Learning Systems](https://mlsysbook.ai/) - Harvard, Vijay Janapa Reddi. <sub>book</sub>
- [The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction](https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/) - Google, Eric Breck, Shanqing Cai, Eric Nielsen, Michael Salib, D. Sculley. <sub>paper</sub>
- [MLOps: Continuous delivery and automation pipelines in machine learning](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning) - Google Cloud. <sub>article</sub>

## ML Systems

Making ML fast and scalable: GPUs, kernels, parallelism, training and serving systems.

- [CMU 17-445/645 — Machine Learning in Production](https://mlip-cmu.github.io/) - Carnegie Mellon University, Christian Kästner, Bogdan Vasilescu. <sub>course</sub>
- [CS149: Parallel Computing](https://cs149.stanford.edu/) - Stanford, Kayvon Fatahalian, Kunle Olukotun. <sub>course</sub>
- [CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) - Stanford, Tatsunori Hashimoto, Percy Liang. <sub>course</sub>
- [Deep Learning Systems: Algorithms and Implementation](https://dlsyscourse.org/) - CMU, Tim Dettmers, Tianqi Chen. <sub>course</sub>
- [Large Language Model Systems](https://llmsystem.github.io/) - CMU, Lei Li. <sub>course</sub>
- [MIT 6.5940 — TinyML and Efficient Deep Learning Computing](https://hanlab.mit.edu/courses/2024-fall-65940) - MIT, Song Han. <sub>course</sub>
- [StaffML](https://mlsysbook.ai/staffml/) - Harvard University, Vijay Janapa Reddi. <sub>course</sub>
- [Introduction to Machine Learning Interviews Book](https://huyenchip.com/ml-interviews-book/) - Chip Huyen. <sub>book</sub>
- [Machine Learning Systems](https://mlsysbook.ai/) - Harvard, Vijay Janapa Reddi. <sub>book</sub>
- [Hidden Technical Debt in Machine Learning Systems](https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html) - Google, D. Sculley et al. <sub>paper</sub>
- [GPU MODE Lectures](https://github.com/gpu-mode/lectures) - GPU MODE. <sub>video</sub>
- [Building A Generative AI Platform](https://huyenchip.com/2024/07/25/genai-platform.html) - Chip Huyen. <sub>article</sub>
- [Rules of Machine Learning: Best Practices for ML Engineering](https://developers.google.com/machine-learning/guides/rules-of-ml) - Google, Martin Zinkevich. <sub>article</sub>
- [The Ultra-Scale Playbook: Training LLMs on GPU Clusters](https://huggingface.co/spaces/nanotron/ultrascale-playbook) - Hugging Face, Nouamane Tazi, Ferdinand Mom, Haojun Zhao, Phuc Nguyen, Mohamed Mekkouri, Leandro von Werra, Thomas Wolf. <sub>article</sub>

## Math

Linear algebra, calculus, probability and statistics.

- [18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/) - MIT OpenCourseWare, David Jerison. <sub>course</sub>
- [18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/) - MIT OpenCourseWare, Gilbert Strang. <sub>course</sub>
- [18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/) - MIT OpenCourseWare, Gilbert Strang. <sub>course</sub>
- [CS 228 - Probabilistic Graphical Models](https://ermongroup.github.io/cs228/) - Stanford, Stefano Ermon. <sub>course</sub>
- [CS229: Machine Learning](https://cs229.stanford.edu/) - Stanford, Jehangir Amjad, Anand Avati. <sub>course</sub>
- [Differential Calculus](https://www.khanacademy.org/math/differential-calculus) - Khan Academy. <sub>course · 6 units</sub>
- [Linear algebra](https://www.khanacademy.org/math/linear-algebra) - Khan Academy. <sub>course · 3 units</sub>
- [Mathematics for Machine Learning and Data Science](https://www.deeplearning.ai/specializations/mathematics-for-machine-learning-and-data-science/) - DeepLearning.AI, Luis Serrano. <sub>course · beginner · ~94 h</sub>
- [MIT 6.041SC — Probabilistic Systems Analysis and Applied Probability](https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/) - MIT OpenCourseWare, John Tsitsiklis. <sub>course</sub>
- [Multivariable calculus](https://www.khanacademy.org/math/multivariable-calculus) - Khan Academy. <sub>course · 5 units</sub>
- [Precalculus](https://www.khanacademy.org/math/precalculus) - Khan Academy. <sub>course · 10 units</sub>
- [Statistics and probability](https://www.khanacademy.org/math/statistics-probability) - Khan Academy. <sub>course · 16 units</sub>
- [An Introduction to Statistical Learning with Applications in Python](https://www.statlearning.com/) - Stanford University, Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani, Jonathan Taylor. <sub>book</sub>
- [Deep Learning](https://www.deeplearningbook.org/) - MIT Press, Goodfellow, Bengio & Courville. <sub>book</sub>
- [Mathematics for Machine Learning](https://mml-book.github.io/) - Cambridge University Press, Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong. <sub>book</sub>
- [Probability for Computer Scientists](https://chrispiech.github.io/probabilityForComputerScientists/en/) - Stanford University, Chris Piech. <sub>book</sub>
- [Think Stats](https://allendowney.github.io/ThinkStats/) - Green Tea Press, Allen B. Downey. <sub>book</sub>
- [Essence of Calculus](https://www.3blue1brown.com/topics/calculus) - 3Blue1Brown, Grant Sanderson. <sub>video</sub>
- [Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra) - 3Blue1Brown, Grant Sanderson. <sub>video</sub>
- [Neural Networks](https://www.3blue1brown.com/topics/neural-networks) - 3Blue1Brown, Grant Sanderson. <sub>video</sub>

## Programming

Writing software well: languages, tools, and the craft of building programs.

- [6.006 Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) - MIT OpenCourseWare, Erik Demaine, Jason Ku, Justin Solomon. <sub>course</sub>
- [6.100L Introduction to CS and Programming using Python](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/) - MIT OpenCourseWare, Ana Bell. <sub>course</sub>
- [AI Dev Tools Zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp) - DataTalks.Club, Alexey Grigorev, Bhavani Ravi, Moein Foroughi. <sub>course</sub>
- [Algorithms, Part I](https://www.coursera.org/learn/algorithms-part1) - Princeton University, Kevin Wayne, Robert Sedgewick. <sub>course · ~50 h</sub>
- [CS50's Introduction to Computer Science](https://cs50.harvard.edu/x/) - Harvard University, David J. Malan. <sub>course · beginner</sub>
- [CS50's Introduction to Programming with Python](https://cs50.harvard.edu/python/) - Harvard University, David J. Malan. <sub>course</sub>
- [Free Computer Vision Courses](https://opencv.org/university/free-courses/) - OpenCV.org. <sub>course · 5 units</sub>
- [Full stack open](https://fullstackopen.com/en/) - University of Helsinki, Matti Luukkainen. <sub>course</sub>
- [Kaggle Learn: Data Visualization](https://www.kaggle.com/learn/data-visualization) - Kaggle, Alexis Cook. <sub>course · ~4 h</sub>
- [Kaggle Learn: Pandas](https://www.kaggle.com/learn/pandas) - Kaggle, Aleksey Bilogur. <sub>course · ~4 h</sub>
- [Kaggle Learn: Python](https://www.kaggle.com/learn/python) - Kaggle, Colin Morris. <sub>course · ~5 h</sub>
- [Python for Everybody](https://www.py4e.com/) - Charles R. Severance. <sub>course</sub>
- [Python Programming for Economics and Finance](https://python-programming.quantecon.org/intro.html) - QuantEcon, Thomas J. Sargent, John Stachurski. <sub>course</sub>
- [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/) - MIT, MIT CSAIL. <sub>course</sub>
- [Elements of Data Science](https://allendowney.github.io/ElementsOfDataScience/) - Green Tea Press, Allen B. Downey. <sub>book</sub>
- [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/) - Jake VanderPlas. <sub>book</sub>
- [Python for Data Analysis, 3E](https://wesmckinney.com/book/) - Wes McKinney. <sub>book</sub>
- [Think Python](https://allendowney.github.io/ThinkPython/) - Green Tea Press, Allen B. Downey. <sub>book</sub>
- [Effective Go](https://go.dev/doc/effective_go) - go.dev, The Go Authors. <sub>docs</sub>
- [NumPy: the absolute basics for beginners](https://numpy.org/doc/stable/user/absolute_beginners.html) - NumPy, NumPy Developers. <sub>docs</sub>
- [Tech Interview Handbook](https://www.techinterviewhandbook.org/) - Tech Interview Handbook, Yangshun Tay. <sub>docs</sub>
- [100 numpy exercises](https://github.com/rougier/numpy-100) - Nicolas P. Rougier. <sub>github</sub>

## Computer Systems

How computers, networks and distributed systems actually work.

- [15-213/15-513/14-513 Introduction to Computer Systems](https://www.cs.cmu.edu/~213/) - CMU, Phillip Gibbons, Seth Goldstein. <sub>course</sub>
- [6.5840: Distributed Systems](https://pdos.csail.mit.edu/6.824/) - MIT, Robert Morris, Frans Kaashoek. <sub>course · advanced</sub>
- [CS 144: Introduction to Computer Networking](https://cs144.github.io/) - Stanford, Keith Winstein. <sub>course</sub>
- [CS149: Parallel Computing](https://cs149.stanford.edu/) - Stanford, Kayvon Fatahalian, Kunle Olukotun. <sub>course</sub>

## Databases

Storing and querying data: SQL, indexes, database internals.

- [CMU 15-445/645 :: Intro to Database Systems](https://15445.courses.cs.cmu.edu/) - CMU, Jignesh Patel. <sub>course</sub>
- [CS50's Introduction to Databases with SQL](https://cs50.harvard.edu/sql/) - Harvard University, Carter Zenke, David J. Malan. <sub>course · beginner</sub>
- [Use The Index, Luke!](https://use-the-index-luke.com/) - Markus Winand. <sub>book</sub>
- [Develop with Redis](https://redis.io/docs/latest/develop/) - Redis. <sub>docs</sub>
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/) - PostgreSQL, PostgreSQL Global Development Group. <sub>docs</sub>

## Backend

Building services: HTTP, architecture, caching, observability.

- [Full stack open](https://fullstackopen.com/en/) - University of Helsinki, Matti Luukkainen. <sub>course</sub>
- [Develop with Redis](https://redis.io/docs/latest/develop/) - Redis. <sub>docs</sub>
- [HTTP: Hypertext Transfer Protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP) - MDN, Mozilla. <sub>docs</sub>
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/) - OpenTelemetry, OpenTelemetry Authors. <sub>docs</sub>
- [A pattern language for microservices](https://microservices.io/patterns/index.html) - microservices.io, Chris Richardson. <sub>article</sub>
- [The Twelve-Factor App](https://12factor.net/) - 12factor.net, Adam Wiggins. <sub>article</sub>

## DevOps

Containers, orchestration and infrastructure as code.

- [Build and share a containerized application](https://docs.docker.com/get-started/tutorials/run-an-app/) - Docker. <sub>docs · 15 min</sub>
- [Get started with Docker](https://docs.docker.com/get-started/) - Docker, Docker Inc. <sub>docs</sub>
- [Kubernetes Documentation](https://kubernetes.io/docs/home/) - kubernetes.io, The Kubernetes Authors. <sub>docs</sub>
- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/) - Kubernetes, The Kubernetes Authors. <sub>docs</sub>
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs) - HashiCorp. <sub>docs</sub>
- [Terraform Tutorials](https://developer.hashicorp.com/terraform/tutorials) - HashiCorp. <sub>docs</sub>
- [The Twelve-Factor App](https://12factor.net/) - 12factor.net, Adam Wiggins. <sub>article</sub>

## Data Engineering

Pipelines that move and shape data at scale.

- [Data Engineering Zoomcamp](https://github.com/DataTalksClub/data-engineering-zoomcamp) - DataTalks.Club, Alexey Grigorev. <sub>course · beginner</sub>

## Technical Writing

Writing clear technical documents.

- [Google Technical Writing One](https://developers.google.com/tech-writing/one) - Google. <sub>course · beginner · ~2 h</sub>
- [Google Technical Writing Two](https://developers.google.com/tech-writing/two) - Google. <sub>course · intermediate · ~1.2 h</sub>

## Staying Current

Ongoing sources to follow. They never finish, so they are not courses — read an issue, keep what matters.

- [StatQuest with Josh Starmer](https://www.youtube.com/@statquest) - StatQuest, Josh Starmer. <sub>video</sub>
- [Ahead of AI](https://magazine.sebastianraschka.com) - Ahead of AI, Sebastian Raschka. <sub>article</sub>
- [Daily Papers](https://huggingface.co/papers) - Hugging Face. <sub>article</sub>
- [Interconnects](https://www.interconnects.ai) - Interconnects, Nathan Lambert. <sub>article</sub>
- [Learn Computer Vision](https://roboflow.com/learn) - Roboflow. <sub>article</sub>
- [One Useful Thing](https://www.oneusefulthing.org) - One Useful Thing, Ethan Mollick. <sub>article</sub>

## Contributing

Found something that meets the criteria? See [CONTRIBUTING.md](CONTRIBUTING.md). Open a pull request that adds one JSON file under `resources/` — this README is generated from those files.

## Acknowledgements

The selection criteria were inspired by [The No-Hype AI Learning Guide](https://github.com/h9-tec/Awesome_ai_learning) by h9-tec.

## License

[![CC BY 4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

This list is licensed under [CC BY 4.0](LICENSE). Reuse it freely — just credit **AI Learning World** and link back to this repository.

<!-- Generated by scripts/build-readme.mjs from resources/*.json. Do not edit by hand. -->
