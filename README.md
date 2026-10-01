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

### Deep Learning & Computer Vision

Train deep networks, then teach them to see. Start after Machine Learning Foundations.

1. **Deep Learning Foundations** — You can train an image classifier in PyTorch and explain each step.
   - [Practical Deep Learning for Coders](https://course.fast.ai/)
   - *Go deeper:* [PyTorch Tutorials](https://docs.pytorch.org/tutorials/) · [Dive into Deep Learning](https://d2l.ai/) · [MIT 6.S191 — Introduction to Deep Learning](https://introtodeeplearning.com/) · [Deep Learning Specialization](https://www.deeplearning.ai/specializations/deep-learning/) · [Understanding Deep Learning](https://udlbook.github.io/udlbook/)
2. **Computer Vision** — You can explain how a CNN sees an image and why residual connections help.
   - [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/)
   - *Go deeper:* [Community Computer Vision Course](https://huggingface.co/learn/computer-vision-course/unit0/welcome/welcome) · [Deep Learning for Computer Vision](https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r) · [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) · [Free Computer Vision Courses](https://opencv.org/university/free-courses/)
3. **Transformers for Vision** — You can explain attention, and how ViT and CLIP apply it to images.
   - [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
   - *Go deeper:* [Attention Is All You Need](https://arxiv.org/abs/1706.03762) · [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929) · [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)
4. **Generative Models** — You can explain how a diffusion model turns noise into an image.
   - [Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion](https://course.fast.ai/Lessons/part2.html)
   - *Go deeper:* [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) · [CS236: Deep Generative Models](https://cs236.stanford.edu/)

### LLMs & AI Agents

How large language models work, and how to build agents on top of them. Start after Machine Learning Foundations.

1. **Transformers** — You can build a tiny GPT and explain every part of it.
   - [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)
   - *Go deeper:* [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) · [Attention Is All You Need](https://arxiv.org/abs/1706.03762) · [Build a Large Language Model (From Scratch)](https://github.com/rasbt/LLMs-from-scratch)
2. **Large Language Models** — You can explain pretraining, fine-tuning and LoRA, and fine-tune a small model.
   - [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)
   - *Go deeper:* [CME 295 - Transformers & Large Language Models (Autumn 2025)](https://cme295.stanford.edu/syllabus/2025/) · [Generative AI with Large Language Models](https://www.deeplearning.ai/courses/generative-ai-with-llms/) · [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685) · [CS336: Language Modeling from Scratch](https://cs336.stanford.edu/)
3. **Building with LLMs** — You can build a retrieval-augmented app and measure whether its answers are right.
   - [LLM Zoomcamp](https://github.com/DataTalksClub/llm-zoomcamp)
   - *Go deeper:* [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) · [Prompt Engineering Guide](https://www.promptingguide.ai) · [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) · [AI Engineering](https://github.com/chiphuyen/aie-book)
4. **AI Agents** — You can build an agent that uses tools, and evaluate it.
   - [Hugging Face AI Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction)
   - *Go deeper:* [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) · [Evaluating AI Agents](https://www.deeplearning.ai/courses/evaluating-ai-agents/) · [AI Agents in LangGraph](https://www.deeplearning.ai/courses/ai-agents-in-langgraph/) · [OpenAI — Agents](https://developers.openai.com/api/docs/guides/agents)

### Machine Learning Foundations

From programming and math to training your first neural network. Every main item is free, exercises included; the rest is optional.

1. **Programming** — You can write, run and debug a small program on your own.
   - [CS50's Introduction to Computer Science](https://cs50.harvard.edu/x/)
   - *Go deeper:* [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)
2. **Math** — You can explain vectors, matrices, derivatives and probability in your own words.
   - [Precalculus](https://www.khanacademy.org/math/precalculus)
   - [Differential Calculus](https://www.khanacademy.org/math/differential-calculus)
   - *Go deeper:* [Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra) · [Essence of Calculus](https://www.3blue1brown.com/topics/calculus) · [Statistics and probability](https://www.khanacademy.org/math/statistics-probability) · [Linear algebra](https://www.khanacademy.org/math/linear-algebra) · [Multivariable calculus](https://www.khanacademy.org/math/multivariable-calculus) · [Mathematics for Machine Learning and Data Science](https://www.deeplearning.ai/specializations/mathematics-for-machine-learning-and-data-science/) · [Mathematics for Machine Learning](https://mml-book.github.io/)
3. **Core Machine Learning** — You can train, evaluate and compare regression and classification models.
   - [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
   - *Go deeper:* [Machine Learning Zoomcamp](https://github.com/DataTalksClub/machine-learning-zoomcamp) · [Machine Learning Specialization](https://www.deeplearning.ai/specializations/machine-learning/) · [CS229: Machine Learning](https://cs229.stanford.edu/) · [UC Berkeley CS189/289A — Introduction to Machine Learning](https://people.eecs.berkeley.edu/~jrs/189/)
4. **Neural Networks** — You can implement backpropagation for a small network from scratch.
   - [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)
   - *Go deeper:* [Neural Networks](https://www.3blue1brown.com/topics/neural-networks) · [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/)

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

- [CS 228 - Probabilistic Graphical Models](https://ermongroup.github.io/cs228/) - Stanford, Stefano Ermon. <sub>course</sub>
- [CS221: Artificial Intelligence: Principles and Techniques](https://cs221.stanford.edu/) - Stanford, Percy Liang. <sub>course</sub>
- [CS229: Machine Learning](https://cs229.stanford.edu/) - Stanford, Jehangir Amjad, Anand Avati. <sub>course</sub>
- [CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/) - Harvard, Brian Yu, David J. Malan. <sub>course</sub>
- [Introduction to GenAI and ML 2025 Fall](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php) - 國立臺灣大學, 李宏毅. <sub>course · beginner · zh-TW</sub>
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

## Deep Learning

Neural networks, how they are trained, and the architectures that work.

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
- [MIT 6.S191 — Introduction to Deep Learning](https://introtodeeplearning.com/) - MIT OpenCourseWare, Alexander Amini, Ava Soleimany. <sub>course · beginner</sub>
- [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) - Andrej Karpathy. <sub>course · ~15 h</sub>
- [Practical Deep Learning for Coders](https://course.fast.ai/) - fast.ai, Jeremy Howard. <sub>course · ~14 h</sub>
- [Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion](https://course.fast.ai/Lessons/part2.html) - fast.ai, Jeremy Howard. <sub>course · ~30 h</sub>
- [Deep Learning](https://www.deeplearningbook.org/) - MIT Press, Goodfellow, Bengio & Courville. <sub>book</sub>
- [Dive into Deep Learning](https://d2l.ai/) - D2L.ai, Zhang, Lipton, Li, Smola. <sub>book</sub>
- [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) - Determination Press, Michael Nielsen. <sub>book</sub>
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

- [Community Computer Vision Course](https://huggingface.co/learn/computer-vision-course/unit0/welcome/welcome) - Hugging Face, Hugging Face Community. <sub>course · beginner</sub>
- [CS231n: Deep Learning for Computer Vision](https://cs231n.stanford.edu/) - Stanford University, Fei-Fei Li, Ehsan Adeli, Justin Johnson, Zane Durante, Tiange Xiang. <sub>course · ~27 h</sub>
- [Deep Learning for Computer Vision](https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r) - University of Michigan. <sub>course · ~26 h</sub>
- [Free Computer Vision Courses](https://opencv.org/university/free-courses/) - OpenCV.org. <sub>course · 5 units</sub>
- [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929) - arXiv, Dosovitskiy et al. <sub>paper</sub>
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) - arXiv, He et al. <sub>paper</sub>
- [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020) - arXiv, Radford et al. <sub>paper</sub>
- [Deconvolution and Checkerboard Artifacts](https://distill.pub/2016/deconv-checkerboard/) - Distill, Odena et al. <sub>article</sub>

## NLP

Natural language processing: text and speech, from classic methods to Transformers.

- [CS224N: Natural Language Processing with Deep Learning](https://web.stanford.edu/class/cs224n/) - Stanford, Diyi Yang, Yejin Choi. <sub>course</sub>
- [Deep Learning for Human Language Processing 2020 Spring](https://speech.ee.ntu.edu.tw/~hylee/dlhlp/2020-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · zh-TW</sub>
- [Hugging Face Audio course](https://huggingface.co/learn/audio-course) - Hugging Face, Sanchit Gandhi, Matthijs Hollemans, Maria Khalusova, Vaibhav Srivastav. <sub>course</sub>
- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) - Hugging Face. <sub>course</sub>
- [Speech and Language Processing (3rd ed. draft)](https://web.stanford.edu/~jurafsky/slp3/) - Stanford University, Dan Jurafsky, James H. Martin. <sub>book</sub>
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - arXiv, Vaswani et al. <sub>paper</sub>
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) - arXiv, Lewis et al. <sub>paper</sub>
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - Jay Alammar. <sub>article</sub>

## LLMs

Large language models: how they are built, trained, adapted and prompted.

- [AI Fluency: Framework and foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations) - Anthropic, Joseph Feller, Rick Dakan. <sub>course</sub>
- [CME 295 - Transformers & Large Language Models (Autumn 2025)](https://cme295.stanford.edu/syllabus/2025/) - Stanford, Afshine Amidi, Shervine Amidi. <sub>course · ~16 h</sub>
- [CME 295 - Transformers & Large Language Models (Autumn 2026)](https://cme295.stanford.edu/) - Stanford, Afshine Amidi, Shervine Amidi. <sub>course</sub>
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
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - arXiv, Vaswani et al. <sub>paper</sub>
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685) - arXiv, Hu et al. <sub>paper</sub>
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) - arXiv, Lewis et al. <sub>paper</sub>
- [Prompt Engineering Guide](https://www.promptingguide.ai) - DAIR.AI. <sub>docs</sub>
- [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) - Anthropic. <sub>docs</sub>
- [AI Engineering Interview Questions Company Wise](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise) - Outcome School, Pallavi. <sub>github</sub>
- [Build a Large Language Model (From Scratch)](https://github.com/rasbt/LLMs-from-scratch) - Manning, Sebastian Raschka. <sub>github</sub>
- [斯坦福大学 CME 295 课程：Transformer 与大语言模型速查表](https://github.com/afshinea/stanford-cme-295-transformers-large-language-models/tree/main/zh) - Stanford, Afshine Amidi, Shervine Amidi. <sub>github · zh-CN</sub>

## Generative AI

Models that generate: diffusion, VAEs, GANs, and building products on them.

- [CS236: Deep Generative Models](https://cs236.stanford.edu/) - Stanford, Stefano Ermon. <sub>course</sub>
- [Generative AI for Beginners](https://microsoft.github.io/generative-ai-for-beginners/) - Microsoft, Microsoft Cloud Advocates. <sub>course</sub>
- [Generative AI with Large Language Models](https://www.deeplearning.ai/courses/generative-ai-with-llms/) - DeepLearning.AI, Antje Barth, Chris Fregly, Shelbee Eigenbrode, Mike Chambers. <sub>course · intermediate · ~13 h</sub>
- [Introduction to GenAI and ML 2025 Fall](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php) - 國立臺灣大學, 李宏毅. <sub>course · beginner · zh-TW</sub>
- [Introduction to Generative AI 2024 Spring](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php) - 國立臺灣大學, 李宏毅. <sub>course · 20 units · zh-TW</sub>
- [Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion](https://course.fast.ai/Lessons/part2.html) - fast.ai, Jeremy Howard. <sub>course · ~30 h</sub>
- [AI Engineering](https://github.com/chiphuyen/aie-book) - O'Reilly, Chip Huyen. <sub>book</sub>
- [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) - Lil'Log, Lilian Weng. <sub>article · 31 min</sub>

## AI Agents

LLM systems that plan, use tools and act — and how to evaluate and govern them.

- [AI Agents in LangGraph](https://www.deeplearning.ai/courses/ai-agents-in-langgraph/) - DeepLearning.AI, Harrison Chase, Rotem Weiss. <sub>course · intermediate · ~1.7 h</sub>
- [AI Dev Tools Zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp) - DataTalks.Club, Alexey Grigorev, Bhavani Ravi, Moein Foroughi. <sub>course</sub>
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
- [OpenAI — Agents](https://developers.openai.com/api/docs/guides/agents) - OpenAI. <sub>docs</sub>
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic, Erik S., Barry Zhang. <sub>article</sub>
- [AI Engineering Interview Questions Company Wise](https://github.com/pallavi-shekhar/ai-engineering-interview-questions-company-wise) - Outcome School, Pallavi. <sub>github</sub>

## Reinforcement Learning

Learning by acting: rewards, policies, value functions.

- [Deep Reinforcement Learning Course](https://huggingface.co/learn/deep-rl-course) - Hugging Face, Thomas Simonini, Omar Sanseviero, Sayak Paul. <sub>course</sub>

## MLOps

Taking models to production: data, deployment, monitoring, iteration.

- [CS 329S: Machine Learning Systems Design](https://stanford-cs329s.github.io/) - Stanford, Chip Huyen. <sub>course</sub>
- [Machine Learning in Production](https://www.deeplearning.ai/courses/machine-learning-in-production/) - DeepLearning.AI, Andrew Ng. <sub>course · intermediate · ~11 h</sub>
- [Made With ML — MLOps](https://madewithml.com/courses/mlops/) - Made With ML, Goku Mohandas. <sub>course</sub>
- [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) - DataTalks.Club, Alexey Grigorev. <sub>course</sub>
- [AI Engineering](https://github.com/chiphuyen/aie-book) - O'Reilly, Chip Huyen. <sub>book</sub>
- [Designing Machine Learning Systems](https://github.com/chiphuyen/dmls-book) - O'Reilly, Chip Huyen. <sub>book</sub>
- [Machine Learning Systems](https://mlsysbook.ai/) - Harvard, Vijay Janapa Reddi. <sub>book</sub>

## ML Systems

Making ML fast and scalable: GPUs, kernels, parallelism, training and serving systems.

- [CS149: Parallel Computing](https://cs149.stanford.edu/) - Stanford, Kayvon Fatahalian, Kunle Olukotun. <sub>course</sub>
- [CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) - Stanford, Tatsunori Hashimoto, Percy Liang. <sub>course</sub>
- [Deep Learning Systems: Algorithms and Implementation](https://dlsyscourse.org/) - CMU, Tim Dettmers, Tianqi Chen. <sub>course</sub>
- [Large Language Model Systems](https://llmsystem.github.io/) - CMU, Lei Li. <sub>course</sub>
- [Machine Learning Systems](https://mlsysbook.ai/) - Harvard, Vijay Janapa Reddi. <sub>book</sub>
- [GPU MODE Lectures](https://github.com/gpu-mode/lectures) - GPU MODE. <sub>video</sub>

## Math

Linear algebra, calculus, probability and statistics.

- [CS 228 - Probabilistic Graphical Models](https://ermongroup.github.io/cs228/) - Stanford, Stefano Ermon. <sub>course</sub>
- [CS229: Machine Learning](https://cs229.stanford.edu/) - Stanford, Jehangir Amjad, Anand Avati. <sub>course</sub>
- [Differential Calculus](https://www.khanacademy.org/math/differential-calculus) - Khan Academy. <sub>course · 6 units</sub>
- [Linear algebra](https://www.khanacademy.org/math/linear-algebra) - Khan Academy. <sub>course · 3 units</sub>
- [Mathematics for Machine Learning and Data Science](https://www.deeplearning.ai/specializations/mathematics-for-machine-learning-and-data-science/) - DeepLearning.AI, Luis Serrano. <sub>course · beginner · ~94 h</sub>
- [Multivariable calculus](https://www.khanacademy.org/math/multivariable-calculus) - Khan Academy. <sub>course · 5 units</sub>
- [Precalculus](https://www.khanacademy.org/math/precalculus) - Khan Academy. <sub>course · 10 units</sub>
- [Statistics and probability](https://www.khanacademy.org/math/statistics-probability) - Khan Academy. <sub>course · 16 units</sub>
- [Deep Learning](https://www.deeplearningbook.org/) - MIT Press, Goodfellow, Bengio & Courville. <sub>book</sub>
- [Mathematics for Machine Learning](https://mml-book.github.io/) - Cambridge University Press, Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong. <sub>book</sub>
- [Essence of Calculus](https://www.3blue1brown.com/topics/calculus) - 3Blue1Brown, Grant Sanderson. <sub>video</sub>
- [Essence of Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra) - 3Blue1Brown, Grant Sanderson. <sub>video</sub>
- [Neural Networks](https://www.3blue1brown.com/topics/neural-networks) - 3Blue1Brown, Grant Sanderson. <sub>video</sub>

## Programming

Writing software well: languages, tools, and the craft of building programs.

- [AI Dev Tools Zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp) - DataTalks.Club, Alexey Grigorev, Bhavani Ravi, Moein Foroughi. <sub>course</sub>
- [CS50's Introduction to Computer Science](https://cs50.harvard.edu/x/) - Harvard University, David J. Malan. <sub>course · beginner</sub>
- [Free Computer Vision Courses](https://opencv.org/university/free-courses/) - OpenCV.org. <sub>course · 5 units</sub>
- [Full stack open](https://fullstackopen.com/en/) - University of Helsinki, Matti Luukkainen. <sub>course</sub>
- [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/) - MIT, MIT CSAIL. <sub>course</sub>
- [Effective Go](https://go.dev/doc/effective_go) - go.dev, The Go Authors. <sub>docs</sub>

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
