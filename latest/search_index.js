var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Documentation",
    "title": "Documentation",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Documentation-1",
    "page": "Documentation",
    "title": "Documentation",
    "category": "section",
    "text": "Turing is a universal probabilistic programming language with an intuitive modelling interface, composable probabilistic inference and computational scalability.Turing provides Hamiltonian Monte Carlo (HMC) and particle MCMC sampling algorithms for complex posterior distributions (e.g. those involving discrete variables and stochastic control flows). Current features include:Universal probabilistic programming with an intuitive modelling interface;\nHamiltonian Monte Carlo (HMC) sampling for differentiable posterior distributions;\nParticle MCMC sampling for complex posterior distributions involving discrete variables and stochastic control flow; and\nGibbs sampling that combines particle MCMC,  HMC and many other MCMC algorithms."
},

{
    "location": "index.html#Citing-Turing-1",
    "page": "Documentation",
    "title": "Citing Turing",
    "category": "section",
    "text": "To cite Turing, please refer to the following paper. A sample BiBTeX entry entry is given below:{% raw %}\n@InProceedings{turing17,\n  title = 	 {{T}uring: a language for flexible probabilistic inference},\n  author = 	 {Ge, Hong and Xu, Kai and Ghahramani, Zoubin},\n  booktitle = 	 {Proceedings of the 21th International Conference on Artificial Intelligence and Statistics},\n  year = 	 {2018},\n  series = 	 {Proceedings of Machine Learning Research},\n  publisher = 	 {PMLR},\n}\n{% endraw %}"
},

{
    "location": "index.html#Other-Probablistic/Deep-Learning-Languages-1",
    "page": "Documentation",
    "title": "Other Probablistic/Deep Learning Languages",
    "category": "section",
    "text": "Stan\nInfer.NET\nPyTorch / Pyro\nTensorFlow / Edward\nDyNet"
},

{
    "location": "get-started.html#",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "page",
    "text": ""
},

{
    "location": "get-started.html#Getting-Started-1",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "section",
    "text": ""
},

{
    "location": "get-started.html#Installation-1",
    "page": "Getting Started",
    "title": "Installation",
    "category": "section",
    "text": "To use Turing, you need install Julia first and then install Turing."
},

{
    "location": "get-started.html#Install-Julia-1",
    "page": "Getting Started",
    "title": "Install Julia",
    "category": "section",
    "text": "You will need to install Julia 1.0, which you can get from the official Julia website."
},

{
    "location": "get-started.html#Install-Turing.jl-1",
    "page": "Getting Started",
    "title": "Install Turing.jl",
    "category": "section",
    "text": "Turing is an officially registered Julia package, so the following will install a stable version of Turing while inside Julia\'s package manager (press ] from the REPL):add TuringIf you want to use the latest version of Turing with some experimental features, you can try the following instead:add Turing#master\ntest TuringIf all tests pass, you\'re ready to start using Turing."
},

{
    "location": "guide.html#",
    "page": "Guide",
    "title": "Guide",
    "category": "page",
    "text": ""
},

{
    "location": "guide.html#Guide-1",
    "page": "Guide",
    "title": "Guide",
    "category": "section",
    "text": ""
},

{
    "location": "guide.html#Basics-1",
    "page": "Guide",
    "title": "Basics",
    "category": "section",
    "text": ""
},

{
    "location": "guide.html#Introduction-1",
    "page": "Guide",
    "title": "Introduction",
    "category": "section",
    "text": "A probabilistic program is Julia code wrapped in a @model macro. It can use arbitrary Julia code, but to ensure correctness of inference it should not have external effects or modify global state. Stack-allocated variables are safe, but mutable heap-allocated objects may lead to subtle bugs when using task copying. To help avoid those we provide a Turing-safe datatype TArray that can be used to create mutable arrays in Turing programs.To specify distributions of random variables, Turing programs should use the ~ notation:x ~ distr where x is a symbol and distr is a distribution. If x is undefined in the model function, inside the probabilistic program, this puts a random variable named x, distributed according to distr, in the current scope. distr can be a value of any type that implements rand(distr), which samples a value from the distribution distr. If x is defined, this is used for conditioning in a style similar to Anglican (another PPL). In this case, x is an observed value, assumed to have been drawn from the distribution distr. The likelihood is computed using logpdf(distr,y). The observe statements should be arranged so that every possible run traverses all of them in exactly the same order. This is equivalent to demanding that they are not placed inside stochastic control flow.Available inference methods include  Importance Sampling (IS), Sequential Monte Carlo (SMC), Particle Gibbs (PG), Hamiltonian Monte Carlo (HMC), Hamiltonian Monte Carlo with Dual Averaging (HMCDA) and The No-U-Turn Sampler (NUTS)."
},

{
    "location": "guide.html#Simple-Gaussian-Demo-1",
    "page": "Guide",
    "title": "Simple Gaussian Demo",
    "category": "section",
    "text": "Below is a simple Gaussian demo illustrate the basic usage of Turing.jl.# Import packages.\nusing Turing\nusing StatPlots\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x, y) = begin\n  s ~ InverseGamma(2,3)\n  m ~ Normal(0,sqrt(s))\n  x ~ Normal(m, sqrt(s))\n  y ~ Normal(m, sqrt(s))\n  return s, m\nendNote: As a sanity check, the expectation of s is 49/24 (2.04166666...) and the expectation of m is 7/6 (1.16666666...).We can perform inference by using the sample function, the first argument of which is our probabalistic program and the second of which is a sampler. More information on each sampler is located in the API.#  Run sampler, collect results.\nc1 = sample(gdemo(1.5, 2), SMC(1000))\nc2 = sample(gdemo(1.5, 2), PG(10,1000))\nc3 = sample(gdemo(1.5, 2), HMC(1000, 0.1, 5))\nc4 = sample(gdemo(1.5, 2), Gibbs(1000, PG(10, 2, :m), HMC(2, 0.1, 5, :s)))\nc5 = sample(gdemo(1.5, 2), HMCDA(1000, 0.15, 0.65))\nc6 = sample(gdemo(1.5, 2), NUTS(1000,  0.65))The MCMCChain module (which is re-exported by Turing) provides plotting tools for the Chain objects returned by a sample function. See the MCMCChain repository for more information on the suite of tools available for diagnosing MCMC chains.# Summarise results\ndescribe(c3)\n\n# Plot results\nplot(c3)\nsavefig(\"gdemo-plot.png\")The arguments for each sampler are:SMC: number of particles.\nPG: number of particles, number of iterations.\nHMC: number of samples, leapfrog step size, leapfrog step numbers.\nGibbs: number of samples, component sampler 1, component sampler 2, ...\nHMCDA: number of samples, total leapfrog length, target accept ratio.\nNUTS: number of samples, target accept ratio.For detailed information on the samplers, please review Turing.jl\'s API documentation."
},

{
    "location": "guide.html#Modelling-Syntax-Explained-1",
    "page": "Guide",
    "title": "Modelling Syntax Explained",
    "category": "section",
    "text": "Using this syntax, a probabilistic model is defined in Turing. The model function generated by Turing can then be used to condition the model onto data. Subsequently, the sample function can be used to generate samples from the posterior distribution.In the following example, the defined model is conditioned to the date (arg1 = 1, arg2 = 2) by passing (1, 2) to the model function.@model model_name(arg_1, arg_2) = begin\n  ...\nendThe conditioned model can then be passed onto the sample function to run posterior inference.model_func = model_name(1, 2)\nchn = sample(model_func, HMC(..)) # Perform inference by sampling using HMC.The returned chain contains samples of the variables in the model.var_1 = mean(chn[:var_1]) # Taking the mean of a variable named var_1.Note that the key (:var_1) should be a symbol. For example, to fetch x[1], one would need to do chn[Symbol(:x[1])."
},

{
    "location": "guide.html#Sampling-from-the-Prior-1",
    "page": "Guide",
    "title": "Sampling from the Prior",
    "category": "section",
    "text": "Turing allows you to sample from a declared model\'s prior by calling the model without specifying inputs or a sampler. In the below example, we specify a gdemo model which accepts two inputs, x and y.@model gdemo(x, y) = begin\n  s ~ InverseGamma(2,3)\n  m ~ Normal(0,sqrt(s))\n  x ~ Normal(m, sqrt(s))\n  y ~ Normal(m, sqrt(s))\n  return x, y\nendAssign the function without inputs to a variable, and Turing will produce a sample from the prior distribution.g = gdemo()\ng\n# Output: (0.685690547873451, -1.1972706455914328)"
},

{
    "location": "guide.html#Beyond-the-Basics-1",
    "page": "Guide",
    "title": "Beyond the Basics",
    "category": "section",
    "text": ""
},

{
    "location": "guide.html#Compositional-Sampling-Using-Gibbs-1",
    "page": "Guide",
    "title": "Compositional Sampling Using Gibbs",
    "category": "section",
    "text": "Turing.jl provides a Gibbs interface to combine different samplers. For example, one can combine an HMC sampler with a PG sampler to run inference for different parameters in a single model as below.@model simple_choice(xs) = begin\n  p ~ Beta(2, 2)\n  z ~ Categorical(p)\n  for x = xs\n    if z == 1\n      x ~ Normal(0, 1)\n    else\n      x ~ Normal(2, 1)\n    end\n  end\nend\n\nsimple_choice_f = simple_choice([1.5, 2.0, 0.3])\n\nchn = sample(simple_choice_f, Gibbs(1000, HMC(1,0.2,3,:p), PG(20,1,:z))For details of compositional sampling in Turing.jl, please check the corresponding paper."
},

{
    "location": "guide.html#Working-with-MCMCChain.jl-1",
    "page": "Guide",
    "title": "Working with MCMCChain.jl",
    "category": "section",
    "text": "Turing.jl wraps its samples using MCMCChain.Chain so that all the functions working for MCMCChain.Chain can be re-used in Turing.jl. Two typical functions are MCMCChain.describe and MCMCChain.plot, which can be used as follows for an obtained chain chn. For more information on MCMCChain, please see the GitHub repository.using MCMCChain: describe, plot\n\ndescribe(chn) # Lists statistics of the samples.\nplot(chn) # Plots statistics of the samples.There are numerous functions in addition to describe and plot in the MCMCChain package, such as those used in convergence diagnostics. For more information on the package, please see the GitHub repository."
},

{
    "location": "guide.html#Changing-Default-Settings-1",
    "page": "Guide",
    "title": "Changing Default Settings",
    "category": "section",
    "text": "Some of Turing.jl\'s default settings can be changed for better usage."
},

{
    "location": "guide.html#AD-Chunk-Size-1",
    "page": "Guide",
    "title": "AD Chunk Size",
    "category": "section",
    "text": "Turing.jl uses ForwardDiff.jl for automatic differentiation, which uses forward-mode chunk-wise AD. The chunk size can be manually set by setchunksize(new_chunk_size); alternatively, use an auto-tuning helper function auto_tune_chunk_size!(mf::Function, rep_num=10), which will profile various chunk sizes. Here mf is the model function, e.g. gdemo(1.5, 2), and rep_num is the number of repetitions during profiling."
},

{
    "location": "guide.html#AD-Backend-1",
    "page": "Guide",
    "title": "AD Backend",
    "category": "section",
    "text": "Since #428, Turing.jl supports Flux.Tracker as backend for reverse mode autodiff. To switch between ForwardDiff.jl and Flux.Tracker, one can call function setadbackend(backend_sym), where backend_sym can be :forward_diff or :reverse_diff."
},

{
    "location": "guide.html#Progress-Meter-1",
    "page": "Guide",
    "title": "Progress Meter",
    "category": "section",
    "text": "Turing.jl uses ProgressMeter.jl to show the progress of sampling, which may lead to slow down of inference or even cause bugs in some IDEs due to I/O. This can be turned on or off by turnprogress(true) and turnprogress(false), of which the former is set as default."
},

{
    "location": "advanced.html#",
    "page": "Advanced Usage",
    "title": "Advanced Usage",
    "category": "page",
    "text": ""
},

{
    "location": "advanced.html#Advanced-Usage-1",
    "page": "Advanced Usage",
    "title": "Advanced Usage",
    "category": "section",
    "text": ""
},

{
    "location": "advanced.html#How-to-Define-a-Customized-Distribution-1",
    "page": "Advanced Usage",
    "title": "How to Define a Customized Distribution",
    "category": "section",
    "text": "Turing.jl supports the use of distributions from the Distributions.jl package. By extension it also supports the use of customized distributions, by defining them as subtypes of Distribution type of the Distributions.jl package, as well as corresponding functions.Below shows a workflow of how to define a customized distribution, using a flat prior as a simple example."
},

{
    "location": "advanced.html#.-Define-the-Distribution-Type-1",
    "page": "Advanced Usage",
    "title": "1. Define the Distribution Type",
    "category": "section",
    "text": "First, define a type of the distribution, as a subtype of a corresponding distribution type in the Distributions.jl package.immutable Flat <: ContinuousUnivariateDistribution\nend"
},

{
    "location": "advanced.html#.-Implement-Sampling-and-Evaluation-of-the-log-pdf-1",
    "page": "Advanced Usage",
    "title": "2. Implement Sampling and Evaluation of the log-pdf",
    "category": "section",
    "text": "Second, define rand() and logpdf(), which will be used to run the model.Distributions.rand(d::Flat) = rand()\nDistributions.logpdf{T<:Real}(d::Flat, x::T) = zero(x)"
},

{
    "location": "advanced.html#.-Define-Helper-Functions-1",
    "page": "Advanced Usage",
    "title": "3. Define Helper Functions",
    "category": "section",
    "text": "In most cases, it may be required to define helper functions, such as the minimum, maximum, rand, and logpdf functions, among others."
},

{
    "location": "advanced.html#.1-Domain-Transformation-1",
    "page": "Advanced Usage",
    "title": "3.1 Domain Transformation",
    "category": "section",
    "text": "Some helper functions are necessary for domain transformation. For univariate distributions, the necessary ones to implement are minimum() and maximum().Distributions.minimum(d::Flat) = -Inf\nDistributions.maximum(d::Flat) = +InfFunctions for domain transformation which may be required by multivariate or matrix-variate distributions are size(d), link(d, x) and invlink(d, x). Please see Turing\'s transform.jl for examples."
},

{
    "location": "advanced.html#.2-Vectorization-Support-1",
    "page": "Advanced Usage",
    "title": "3.2 Vectorization Support",
    "category": "section",
    "text": "The vectorization syntax follows rv ~ [distribution], which requires rand() and logpdf() to be called on multiple data points at once. An appropriate implementation for Flat are shown below.Distributions.rand(d::Flat, n::Int) = Vector([rand() for _ = 1:n])\nDistributions.logpdf{T<:Real}(d::Flat, x::Vector{T}) = zero(x)"
},

{
    "location": "advanced.html#Avoid-Using-the-@model-Macro-1",
    "page": "Advanced Usage",
    "title": "Avoid Using the @model Macro",
    "category": "section",
    "text": "When integrating Turing.jl with other libraries, it can be necessary to avoid using the @model macro. To achieve this, one needs to understand the @model macro, which works as a closure and generates an amended function byassigning the arguments to corresponding local variables;\nadding two keyword arguments vi=VarInfo() and sampler=nothing to the scope; and\nforcing the function to return vi.Thus by doing these three steps manually, one can get rid of the @model macro. Taking the gdemo model as an example, the two code sections below (macro and macro-free) are equivalent.@model gdemo(x, y) = begin\n    s ~ InverseGamma(2,3)\n    m ~ Normal(0,sqrt(s))\n    x ~ Normal(m, sqrt(s))\n    x ~ Normal(m, sqrt(s))\n    return s, m\nend\n\nmf = gdemo(1.5, 2.0)\nsample(mf, HMC(1000, 0.1, 5))# Force Turing.jl to initialize its compiler\nmf(vi, sampler; x=[1.5, 2.0]) = begin\n  s = Turing.assume(sampler,\n                    InverseGamma(2, 3),\n                    Turing.VarName(vi, [:c_s, :s], \"\"),\n                    vi)\n  m = Turing.assume(sampler,\n                    Normal(0,sqrt(s)),\n                    Turing.VarName(vi, [:c_m, :m], \"\"),\n                    vi)\n  for i = 1:2\n    Turing.observe(sampler,\n                   Normal(m, sqrt(s)),\n                   x[i],\n                   vi)\n  end\n  vi\nend\nmf() = mf(Turing.VarInfo(), nothing)\n\nsample(mf, HMC(1000, 0.1, 5))Note that the use of ~ must be removed due to the fact that in Julia 0.6, ~ is no longer a macro. For this reason, Turing.jl parses ~ within the @model macro to allow for this intuitive notation."
},

{
    "location": "advanced.html#Task-Copying-1",
    "page": "Advanced Usage",
    "title": "Task Copying",
    "category": "section",
    "text": "Turing copies Julia tasks to deliver efficient inference algorithms, but it also provides alternative slower implementation as a fallback. Task copying is enabled by default. Task copying requires building a small C program, which should be done automatically on Linux and Mac systems that have GCC and Make installed."
},

{
    "location": "contributing/guide.html#",
    "page": "Contributing",
    "title": "Contributing",
    "category": "page",
    "text": ""
},

{
    "location": "contributing/guide.html#Contributing-1",
    "page": "Contributing",
    "title": "Contributing",
    "category": "section",
    "text": "Turing is an open source project. If you feel that you have some relevant skills and are interested in contributing, then please do get in touch. You can contribute by opening issues on GitHub or implementing things yourself and making a pull request. We would also appreciate example models written using Turing.Turing has a style guide. It is not strictly necessary to review it before making a pull request, but you may be asked to change portions of your code to conform with the style guide before it is merged."
},

{
    "location": "contributing/guide.html#How-to-Contribute-1",
    "page": "Contributing",
    "title": "How to Contribute",
    "category": "section",
    "text": ""
},

{
    "location": "contributing/guide.html#Getting-Started-1",
    "page": "Contributing",
    "title": "Getting Started",
    "category": "section",
    "text": "Fork this repository.\nClone your fork on your local machine: git clone https://github.com/your_username/Turing.jl.\nAdd a remote corresponding to this repository:git remote add upstream https://github.com/TuringLang/Turing.jl."
},

{
    "location": "contributing/guide.html#What-Can-I-Do?-1",
    "page": "Contributing",
    "title": "What Can I Do?",
    "category": "section",
    "text": "Look at the issues page to find an outstanding issue. For instance, you could implement new features, fix bugs or write example models."
},

{
    "location": "contributing/guide.html#Git-Workflow-1",
    "page": "Contributing",
    "title": "Git Workflow",
    "category": "section",
    "text": "For more information on how the Git workflow typically functions, please see the GitHub\'s introduction or Julia\'s contribution guide."
},

{
    "location": "contributing/style_guide.html#",
    "page": "Style Guide",
    "title": "Style Guide",
    "category": "page",
    "text": ""
},

{
    "location": "contributing/style_guide.html#Style-Guide-1",
    "page": "Style Guide",
    "title": "Style Guide",
    "category": "section",
    "text": "This style guide is adapted from Invenia\'s style guide. We would like to thank them for allowing us to access and use it. Please don\'t let not having read it stop you from contributing to Turing! No one will be annoyed if you open a PR whose style doesn\'t follow these conventions; we will just help you correct it before it gets merged.These conventions were originally written at Invenia, taking inspiration from a variety of sources including Python\'s PEP8, Julia\'s Notes for Contributors, and Julia\'s Style Guide.What follows is a mixture of a verbatim copy of Invenia\'s original guide and some of our own modifications."
},

{
    "location": "contributing/style_guide.html#A-Word-on-Consistency-1",
    "page": "Style Guide",
    "title": "A Word on Consistency",
    "category": "section",
    "text": "When adhering to this style it\'s important to realize that these are guidelines and not rules. This is stated best in the PEP8:A style guide is about consistency. Consistency with this style guide is important. Consistency within a project is more important. Consistency within one module or function is most important.But most importantly: know when to be inconsistent – sometimes the style guide just doesn\'t apply. When in doubt, use your best judgment. Look at other examples and decide what looks best. And don\'t hesitate to ask!"
},

{
    "location": "contributing/style_guide.html#Synopsis-1",
    "page": "Style Guide",
    "title": "Synopsis",
    "category": "section",
    "text": "Attempt to follow both the Julia Contribution Guidelines, the Julia Style Guide, and this guide. When convention guidelines conflict this guide takes precedence (known conflicts will be noted in this guide).Use 4 spaces per indentation level, no tabs.\nTry to adhere to a 92 character line length limit.\nUse upper camel case convention for modules and types.\nUse lower case with underscores for method names (note: Julia code likes to use lower case without underscores).\nComments are good, try to explain the intentions of the code.\nUse whitespace to make the code more readable.\nNo whitespace at the end of a line (trailing whitespace).\nAvoid padding brackets with spaces. ex. Int64(value) preferred over Int64( value )."
},

{
    "location": "contributing/style_guide.html#Editor-Configuration-1",
    "page": "Style Guide",
    "title": "Editor Configuration",
    "category": "section",
    "text": ""
},

{
    "location": "contributing/style_guide.html#Sublime-Text-Settings-1",
    "page": "Style Guide",
    "title": "Sublime Text Settings",
    "category": "section",
    "text": "If you are a user of Sublime Text we recommend that you have the following options in your Julia syntax specific settings. To modify these settings first open any Julia file (*.jl) in Sublime Text. Then navigate to: Preferences > Settings - More > Syntax Specific - User{\n    \"translate_tabs_to_spaces\": true,\n    \"tab_size\": 4,\n    \"trim_trailing_white_space_on_save\": true,\n    \"ensure_newline_at_eof_on_save\": true,\n    \"rulers\": [92]\n}"
},

{
    "location": "contributing/style_guide.html#Vim-Settings-1",
    "page": "Style Guide",
    "title": "Vim Settings",
    "category": "section",
    "text": "If you are a user of Vim we recommend that you add the following options to your .vimrc file.set tabstop=4                             \" Sets tabstops to a width of four columns.\nset softtabstop=4                         \" Determines the behaviour of TAB and BACKSPACE keys with expandtab.\nset shiftwidth=4                          \" Determines the results of >>, <<, and ==.\n\nau FileType julia setlocal expandtab      \" Replaces tabs with spaces.\nau FileType julia setlocal colorcolumn=93 \" Highlights column 93 to help maintain the 92 character line limit.By default, Vim seems to guess that .jl files are written in Lisp. To ensure that Vim recognizes Julia files you can manually have it check for the .jl extension, but a better solution is to install Julia-Vim, which also includes proper syntax highlighting and a few cool other features."
},

{
    "location": "contributing/style_guide.html#Atom-Settings-1",
    "page": "Style Guide",
    "title": "Atom Settings",
    "category": "section",
    "text": "Atom defaults preferred line length to 80 characters. We want that at 92 for julia. To change it:Go to Atom -> Preferences -> Packages.\nSearch for the \"language-julia\" package and open the settings for it.\nFind preferred line length (under \"Julia Grammar\") and change it to 92."
},

{
    "location": "contributing/style_guide.html#Code-Formatting-1",
    "page": "Style Guide",
    "title": "Code Formatting",
    "category": "section",
    "text": ""
},

{
    "location": "contributing/style_guide.html#Function-Naming-1",
    "page": "Style Guide",
    "title": "Function Naming",
    "category": "section",
    "text": "Names of functions should describe an action or property irrespective of the type of the argument; the argument\'s type provides this information instead. For example, buyfood(food) should be buy(food::Food).Names of functions should usually be limited to one or two lowercase words. Ideally write buyfood not buy_food, but if you are writing a function whose name is hard to read without underscores then please do use them."
},

{
    "location": "contributing/style_guide.html#Method-Definitions-1",
    "page": "Style Guide",
    "title": "Method Definitions",
    "category": "section",
    "text": "Only use short-form function definitions when they fit on a single line:# Yes:\nfoo(x::Int64) = abs(x) + 3\n# No:\nfoobar(array_data::AbstractArray{T}, item::T) where {T<:Int64} = T[\n    abs(x) * abs(item) + 3 for x in array_data\n]\n\n# No:\nfoobar(\n    array_data::AbstractArray{T},\n    item::T,\n) where {T<:Int64} = T[abs(x) * abs(item) + 3 for x in array_data]\n# Yes:\nfunction foobar(array_data::AbstractArray{T}, item::T) where T<:Int64\n    return T[abs(x) * abs(item) + 3 for x in array_data]\nendWhen using long-form functions always use the return keyword:# Yes:\nfunction fnc(x::T) where T\n    result = zero(T)\n    result += fna(x)\n    return result\nend\n# No:\nfunction fnc(x::T) where T\n    result = zero(T)\n    result += fna(x)\nend\n\n# Yes:\nfunction Foo(x, y)\n    return new(x, y)\nend\n# No:\nfunction Foo(x, y)\n    new(x, y)\nendFunctions definitions with parameter lines which exceed 92 characters should separate each parameter by a newline and indent by one-level:# Yes:\nfunction foobar(\n    df::DataFrame,\n    id::Symbol,\n    variable::Symbol,\n    value::AbstractString,\n    prefix::AbstractString=\"\",\n)\n    # code\nend\n\n# Ok:\nfunction foobar(df::DataFrame, id::Symbol, variable::Symbol, value::AbstractString, prefix::AbstractString=\"\")\n    # code\nend\n# No:\nfunction foobar(df::DataFrame, id::Symbol, variable::Symbol, value::AbstractString,\n    prefix::AbstractString=\"\")\n\n    # code\nend\n# No:\nfunction foobar(\n        df::DataFrame,\n        id::Symbol,\n        variable::Symbol,\n        value::AbstractString,\n        prefix::AbstractString=\"\",\n    )\n    # code\nend"
},

{
    "location": "contributing/style_guide.html#Keyword-Arguments-1",
    "page": "Style Guide",
    "title": "Keyword Arguments",
    "category": "section",
    "text": "When calling a function always separate your keyword arguments from your positional arguments with a semicolon. This avoids mistakes in ambiguous cases (such as splatting a Dict).# Yes:\nxy = foo(x; y=3)\n# No:\nxy = foo(x, y=3)"
},

{
    "location": "contributing/style_guide.html#Whitespace-1",
    "page": "Style Guide",
    "title": "Whitespace",
    "category": "section",
    "text": "Avoid extraneous whitespace in the following situations:Immediately inside parentheses, square brackets or braces.Yes: spam(ham[1], [eggs])\nNo:  spam( ham[ 1 ], [ eggs ] )Immediately before a comma or semicolon:Yes: if x == 4 @show(x, y); x, y = y, x end\nNo:  if x == 4 @show(x , y) ; x , y = y , x endWhen using ranges unless additional operators are used:Yes: ham[1:9], ham[1:3:9], ham[1:3:end]\nNo:  ham[1: 9], ham[1 : 3: 9]Yes: ham[lower:upper], ham[lower:step:upper]\nYes: ham[lower + offset : upper + offset]\nYes: ham[(lower + offset):(upper + offset)]\nNo:  ham[lower + offset:upper + offset]More than one space around an assignment (or other) operator to align it with another:# Yes:\nx = 1\ny = 2\nlong_variable = 3\n\n# No:\nx             = 1\ny             = 2\nlong_variable = 3Always surround these binary operators with a single space on either side: assignment (=), updating operators (+=, -=, etc.), numeric comparisons operators (==, , , =, etc.). Note that this guideline does not apply when performing assignment in method definitions.Yes: i = i + 1\nNo:  i=i+1\n\nYes: submitted += 1\nNo:  submitted +=1\n\nYes: x^2 < y\nNo:  x^2<yAssignments using expanded array, tuple, or function notation should have the first open bracket on the same line assignment operator and the closing bracket should match the indentation level of the assignment. Alternatively you can perform assignments on a single line when they are short:# Yes:\narr = [\n    1,\n    2,\n    3,\n]\narr = [\n    1, 2, 3,\n]\nresult = Function(\n    arg1,\n    arg2,\n)\narr = [1, 2, 3]\n\n\n# No:\narr =\n[\n    1,\n    2,\n    3,\n]\narr =\n[\n    1, 2, 3,\n]\narr = [\n    1,\n    2,\n    3,\n    ]Nested array or tuples that are in expanded notation should have the opening and closing brackets at the same indentation level:# Yes:\nx = [\n    [\n        1, 2, 3,\n    ],\n    [\n        \"hello\",\n        \"world\",\n    ],\n    [\'a\', \'b\', \'c\'],\n]\n\n# No:\ny = [\n    [\n        1, 2, 3,\n    ], [\n        \"hello\",\n        \"world\",\n    ],\n]\nz = [[\n        1, 2, 3,\n    ], [\n        \"hello\",\n        \"world\",\n    ],\n]Always include the trailing comma when working with expanded arrays, tuples or functions notation. This allows future edits to easily move elements around or add additional elements. The trailing comma should be excluded when the notation is only on a single-line:# Yes:\narr = [\n    1,\n    2,\n    3,\n]\nresult = Function(\n    arg1,\n    arg2,\n)\narr = [1, 2, 3]\n\n# No:\narr = [\n    1,\n    2,\n    3\n]\nresult = Function(\n    arg1,\n    arg2\n)\narr = [1, 2, 3,]Triple-quotes use the indentation of the lowest indented line (excluding the opening triple-quote). This means the closing triple-quote should be aligned to least indented line in the string. Triple-backticks should also follow this style even though the indentation does not matter for them.# Yes:\nstr = \"\"\"\n    hello\n    world!\n    \"\"\"\nstr = \"\"\"\n        hello\n    world!\n    \"\"\"\ncmd = ```\n    program\n        --flag value\n        parameter\n      ```\n# No:\nstr = \"\"\"\n    hello\n    world!\n\"\"\""
},

{
    "location": "contributing/style_guide.html#Comments-1",
    "page": "Style Guide",
    "title": "Comments",
    "category": "section",
    "text": "Comments should be used to state the intended behaviour of code. This is especially important when the code is doing something clever that may not be obvious upon first inspection. Avoid writing comments that state exactly what the code obviously does.# Yes:\nx = x + 1      # Compensate for border\n\n# No:\nx = x + 1      # Increment xComments that contradict the code are much worse than no comments. Always make a priority of keeping the comments up-to-date with code changes!Comments should be complete sentences. If a comment is a phrase or sentence, its first word should be capitalized, unless it is an identifier that begins with a lower case letter (never alter the case of identifiers!).If a comment is short, the period at the end can be omitted. Block comments generally consist of one or more paragraphs built out of complete sentences, and each sentence should end in a period.Comments should be separated by at least two spaces from the expression and have a single space after the #.When referencing Julia in documentation note that \"Julia\" refers to the programming language while \"julia\" (typically in backticks, e.g. julia) refers to the executable.\n# A commment\ncode\n\n# Another comment\nmore code\n\nTODO"
},

{
    "location": "contributing/style_guide.html#Documentation-1",
    "page": "Style Guide",
    "title": "Documentation",
    "category": "section",
    "text": "It is recommended that most modules, types and functions should have docstrings. That being said, only exported functions are required to be documented. Avoid documenting methods like == as the built in docstring for the function already covers the details well. Try to document a function and not individual methods where possible as typically all methods will have similar docstrings. If you are adding a method to a function which was defined in Base or another package only add a docstring if the behaviour of your function deviates from the existing docstring.Docstrings are written in Markdown and should be concise. Docstring lines should be wrapped at 92 characters.\"\"\"\n    bar(x[, y])\n\nCompute the Bar index between `x` and `y`. If `y` is missing, compute the Bar index between\nall pairs of columns of `x`.\n\"\"\"\nfunction bar(x, y) ...When types or methods have lots of parameters it may not be feasible to write a concise docstring. In these cases it is recommended you use the templates below. Note if a section doesn\'t apply or is overly verbose (for example \"Throws\" if your function doesn\'t throw an exception) it can be excluded. It is recommended that you have a blank line between the headings and the content when the content is of sufficient length. Try to be consistent within a docstring whether you use this additional whitespace. Note that the additional space is only for reading raw markdown and does not effect the rendered version.Type Template (should be skipped if is redundant with the constructor(s) docstring):\"\"\"\n    MyArray{T,N}\n\nMy super awesome array wrapper!\n\n# Fields\n- `data::AbstractArray{T,N}`: stores the array being wrapped\n- `metadata::Dict`: stores metadata about the array\n\"\"\"\nstruct MyArray{T,N} <: AbstractArray{T,N}\n    data::AbstractArray{T,N}\n    metadata::Dict\nendFunction Template (only required for exported functions):\"\"\"\n    mysearch(array::MyArray{T}, val::T; verbose=true) where {T} -> Int\n\nSearches the `array` for the `val`. For some reason we don\'t want to use Julia\'s\nbuiltin search :)\n\n# Arguments\n- `array::MyArray{T}`: the array to search\n- `val::T`: the value to search for\n\n# Keywords\n- `verbose::Bool=true`: print out progress details\n\n# Returns\n- `Int`: the index where `val` is located in the `array`\n\n# Throws\n- `NotFoundError`: I guess we could throw an error if `val` isn\'t found.\n\"\"\"\nfunction mysearch(array::AbstractArray{T}, val::T) where T\n    ...\nendIf your method contains lots of arguments or keywords you may want to exclude them from the method signature on the first line and instead use args... and/or kwargs....\"\"\"\n    Manager(args...; kwargs...) -> Manager\n\nA cluster manager which spawns workers.\n\n# Arguments\n\n- `min_workers::Integer`: The minimum number of workers to spawn or an exception is thrown\n- `max_workers::Integer`: The requested number of worker to spawn\n\n# Keywords\n\n- `definition::AbstractString`: Name of the job definition to use. Defaults to the\n    definition used within the current instance.\n- `name::AbstractString`: ...\n- `queue::AbstractString`: ...\n\"\"\"\nfunction Manager(...)\n    ...\nendFeel free to document multiple methods for a function within the same docstring. Be careful to only do this for functions you have defined.\"\"\"\n    Manager(max_workers; kwargs...)\n    Manager(min_workers:max_workers; kwargs...)\n    Manager(min_workers, max_workers; kwargs...)\n\nA cluster manager which spawns workers.\n\n# Arguments\n\n- `min_workers::Int`: The minimum number of workers to spawn or an exception is thrown\n- `max_workers::Int`: The number of requested workers to spawn\n\n# Keywords\n\n- `definition::AbstractString`: Name of the job definition to use. Defaults to the\n    definition used within the current instance.\n- `name::AbstractString`: ...\n- `queue::AbstractString`: ...\n\"\"\"\nfunction Manager end\nIf the documentation for bullet-point exceeds 92 characters the line should be wrapped and slightly indented. Avoid aligning the text to the :.\"\"\"\n...\n\n# Keywords\n- `definition::AbstractString`: Name of the job definition to use. Defaults to the\n    definition used within the current instance.\n\"\"\"For additional details on documenting in Julia see the official documentation."
},

{
    "location": "contributing/style_guide.html#Test-Formatting-1",
    "page": "Style Guide",
    "title": "Test Formatting",
    "category": "section",
    "text": ""
},

{
    "location": "contributing/style_guide.html#Testsets-1",
    "page": "Style Guide",
    "title": "Testsets",
    "category": "section",
    "text": "Julia provides test sets which allows developers to group tests into logical groupings. Test sets can be nested and ideally packages should only have a single \"root\" test set. It is recommended that the \"runtests.jl\" file contains the root test set which contains the remainder of the tests:@testset \"PkgExtreme\" begin\n    include(\"arithmetic.jl\")\n    include(\"utils.jl\")\nend"
},

{
    "location": "contributing/style_guide.html#Comparisons-1",
    "page": "Style Guide",
    "title": "Comparisons",
    "category": "section",
    "text": "Most tests are written in the form @test x == y. Since the == function doesn\'t take types into account tests like the following are valid: @test 1.0 == 1. Avoid adding visual noise into test comparisons:# Yes:\n@test value == 0\n\n# No:\n@test value == 0.0"
},

{
    "location": "api.html#",
    "page": "Library",
    "title": "Library",
    "category": "page",
    "text": ""
},

{
    "location": "api.html#Function-Documentation-1",
    "page": "Library",
    "title": "Function Documentation",
    "category": "section",
    "text": "CurrentModule = TuringPages = [\"functions.md\"]\nDepth = 5"
},

{
    "location": "api.html#Turing.@model",
    "page": "Library",
    "title": "Turing.@model",
    "category": "macro",
    "text": "@model(name, fbody)\n\nMacro to specify a probabilistic model.\n\nExample:\n\n@model Gaussian(x) = begin\n    s ~ InverseGamma(2,3)\n    m ~ Normal(0,sqrt.(s))\n    for i in 1:length(x)\n        x[i] ~ Normal(m, sqrt.(s))\n    end\n    return (s, m)\nend\n\nCompiler design: sample(fname(x,y), sampler).\n\nfname(x=nothing,y=nothing; compiler=compiler) = begin\n    ex = quote\n        # Pour in kwargs for those args where value != nothing.\n        fname_model(vi::VarInfo, sampler::Sampler; x = x, y = y) = begin\n            vi.logp = zero(Real)\n          \n            # Pour in model definition.\n            x ~ Normal(0,1)\n            y ~ Normal(x, 1)\n            return x, y\n        end\n    end\n    return Main.eval(ex)\nend\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.@~",
    "page": "Library",
    "title": "Turing.@~",
    "category": "macro",
    "text": "macro: @~ var Distribution()\n\nTilde notation macro. This macro constructs Turing.observe or Turing.assume calls depending on the left-hand argument. Note that the macro is interconnected with the @model macro and assumes that a compiler struct is available.\n\nExample:\n\n@~ x Normal()\n\n\n\n\n\n"
},

{
    "location": "api.html#Modelling-1",
    "page": "Library",
    "title": "Modelling",
    "category": "section",
    "text": "@model\n@~"
},

{
    "location": "api.html#Turing.Sampler",
    "page": "Library",
    "title": "Turing.Sampler",
    "category": "type",
    "text": "Sampler{T}\n\nGeneric interface for implementing inference algorithms. An implementation of an algorithm should include the following:\n\nA type specifying the algorithm and its parameters, derived from InferenceAlgorithm\nA method of sample function that produces results of inference, which is where actual inference happens.\n\nTuring translates models to chunks that call the modelling functions at specified points. The dispatch is based on the value of a sampler variable. To include a new inference algorithm implements the requirements mentioned above in a separate file, then include that file at the end of this one.\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.Gibbs",
    "page": "Library",
    "title": "Turing.Gibbs",
    "category": "type",
    "text": "Gibbs(n_iters, alg_1, alg_2)\n\nCompositional MCMC interface.\n\nExample:\n\nalg = Gibbs(1000, HMC(1, 0.2, 3, :v1), PG(20, 1, :v2))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.HMC",
    "page": "Library",
    "title": "Turing.HMC",
    "category": "type",
    "text": "HMC(n_iters::Int, epsilon::Float64, tau::Int)\n\nHamiltonian Monte Carlo sampler.\n\nUsage:\n\nHMC(1000, 0.05, 10)\n\nExample:\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x) = begin\n    s ~ InverseGamma(2,3)\n    m ~ Normal(0, sqrt(s))\n    x[1] ~ Normal(m, sqrt(s))\n    x[2] ~ Normal(m, sqrt(s))\n    return s, m\nend\n\nsample(gdemo([1.5, 2]), HMC(1000, 0.05, 10))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.HMCDA",
    "page": "Library",
    "title": "Turing.HMCDA",
    "category": "type",
    "text": "HMCDA(n_iters::Int, n_adapt::Int, delta::Float64, lambda::Float64)\n\nHamiltonian Monte Carlo sampler wiht Dual Averaging algorithm.\n\nUsage:\n\nHMCDA(1000, 200, 0.65, 0.3)\n\nExample:\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x) = begin\n  s ~ InverseGamma(2,3)\n  m ~ Normal(0, sqrt(s))\n  x[1] ~ Normal(m, sqrt(s))\n  x[2] ~ Normal(m, sqrt(s))\n  return s, m\nend\n\nsample(gdemo([1.5, 2]), HMCDA(1000, 200, 0.65, 0.3))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.IPMCMC",
    "page": "Library",
    "title": "Turing.IPMCMC",
    "category": "type",
    "text": "IPMCMC(n_particles::Int, n_iters::Int, n_nodes::Int, n_csmc_nodes::Int)\n\nParticle Gibbs sampler.\n\nUsage:\n\nIPMCMC(100, 100, 4, 2)\n\nExample:\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x) = begin\n  s ~ InverseGamma(2,3)\n  m ~ Normal(0,sqrt(s))\n  x[1] ~ Normal(m, sqrt(s))\n  x[2] ~ Normal(m, sqrt(s))\n  return s, m\nend\n\nsample(gdemo([1.5, 2]), IPMCMC(100, 100, 4, 2))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.IS",
    "page": "Library",
    "title": "Turing.IS",
    "category": "type",
    "text": "IS(n_particles::Int)\n\nImportance sampling algorithm object.\n\nn_particles is the number of particles to use\n\nUsage:\n\nIS(1000)\n\nExample:\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x) = begin\n    s ~ InverseGamma(2,3)\n    m ~ Normal(0,sqrt.(s))\n    x[1] ~ Normal(m, sqrt.(s))\n    x[2] ~ Normal(m, sqrt.(s))\n    return s, m\nend\n\nsample(gdemo([1.5, 2]), IS(1000))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.MH",
    "page": "Library",
    "title": "Turing.MH",
    "category": "type",
    "text": "MH(n_iters::Int)\n\nMetropolis-Hasting sampler.\n\nUsage:\n\nMH(100, (:m, (x) -> Normal(x, 0.1)))\n\nExample:\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x) = begin\n  s ~ InverseGamma(2,3)\n  m ~ Normal(0,sqrt(s))\n  x[1] ~ Normal(m, sqrt(s))\n  x[2] ~ Normal(m, sqrt(s))\n  return s, m\nend\n\nsample(gdemo([1.5, 2]), MH(1000, (:m, (x) -> Normal(x, 0.1)), :s)))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.NUTS",
    "page": "Library",
    "title": "Turing.NUTS",
    "category": "type",
    "text": "NUTS(n_iters::Int, n_adapt::Int, delta::Float64)\n\nNo-U-Turn Sampler (NUTS) sampler.\n\nUsage:\n\nNUTS(1000, 200, 0.6j_max)\n\nExample:\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x) = begin\n  s ~ InverseGamma(2,3)\n  m ~ Normal(0, sqrt(s))\n  x[1] ~ Normal(m, sqrt(s))\n  x[2] ~ Normal(m, sqrt(s))\n  return s, m\nend\n\nsample(gdemo([1.j_max, 2]), NUTS(1000, 200, 0.6j_max))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.PG",
    "page": "Library",
    "title": "Turing.PG",
    "category": "type",
    "text": "PG(n_particles::Int, n_iters::Int)\n\nParticle Gibbs sampler.\n\nUsage:\n\nPG(100, 100)\n\nExample:\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x) = begin\n  s ~ InverseGamma(2,3)\n  m ~ Normal(0, sqrt(s))\n  x[1] ~ Normal(m, sqrt(s))\n  x[2] ~ Normal(m, sqrt(s))\n  return s, m\nend\n\nsample(gdemo([1.5, 2]), PG(100, 100))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.PMMH",
    "page": "Library",
    "title": "Turing.PMMH",
    "category": "type",
    "text": "PMMH(n_iters::Int, smc_alg:::SMC, parameters_algs::Tuple{MH})\n\nParticle independant Metropolis–Hastings and Particle marginal Metropolis–Hastings samplers.\n\nUsage:\n\nalg = PMMH(100, SMC(20, :v1), MH(1,:v2))\nalg = PMMH(100, SMC(20, :v1), MH(1,(:v2, (x) -> Normal(x, 1))))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.SGHMC",
    "page": "Library",
    "title": "Turing.SGHMC",
    "category": "type",
    "text": "SGHMC(n_iters::Int, learning_rate::Float64, momentum_decay::Float64)\n\nStochastic Gradient Hamiltonian Monte Carlo sampler.\n\nUsage:\n\nSGHMC(1000, 0.01, 0.1)\n\nExample:\n\n@model example begin\n  ...\nend\n\nsample(example, SGHMC(1000, 0.01, 0.1))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.SGLD",
    "page": "Library",
    "title": "Turing.SGLD",
    "category": "type",
    "text": "SGLD(n_iters::Int, step_size::Float64)\n\nStochastic Gradient Langevin Dynamics sampler.\n\nUsage:\n\nSGLD(1000, 0.5)\n\nExample:\n\n@model example begin\n  ...\nend\n\nsample(example, SGLD(1000, 0.5))\n\n\n\n\n\n"
},

{
    "location": "api.html#Turing.SMC",
    "page": "Library",
    "title": "Turing.SMC",
    "category": "type",
    "text": "SMC(n_particles::Int)\n\nSequential Monte Carlo sampler.\n\nUsage:\n\nSMC(1000)\n\nExample:\n\n# Define a simple Normal model with unknown mean and variance.\n@model gdemo(x) = begin\n  s ~ InverseGamma(2,3)\n  m ~ Normal(0, sqrt(s))\n  x[1] ~ Normal(m, sqrt(s))\n  x[2] ~ Normal(m, sqrt(s))\n  return s, m\nend\n\nsample(gdemo([1.5, 2]), SMC(1000))\n\n\n\n\n\n"
},

{
    "location": "api.html#Samplers-1",
    "page": "Library",
    "title": "Samplers",
    "category": "section",
    "text": "Sampler\nGibbs\nHMC\nHMCDA\nIPMCMC\nIS\nMH\nNUTS\nPG\nPMMH\nSGHMC\nSGLD\nSMC"
},

{
    "location": "api.html#Index-1",
    "page": "Library",
    "title": "Index",
    "category": "section",
    "text": ""
},

]}
