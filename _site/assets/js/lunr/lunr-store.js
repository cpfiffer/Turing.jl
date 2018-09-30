var store = [{
        "title": "Advanced",
        "excerpt":"Advanced Usage How to Define a Customized Distribution Turing.jl supports the use of distributions from the Distributions.jl package. By extension it also supports the use of customized distributions, by defining them as subtypes of Distribution type of the Distributions.jl package, as well as corresponding functions. Below shows a workflow of...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/docs/advanced",
        "teaser":null},{
        "title": "Public API",
        "excerpt":"Function Documentation Modelling # Turing.@model — Macro. @model(name, fbody)Macro to specify a probabilistic model. Example: @model Gaussian(x) = begin s ~ InverseGamma(2,3) m ~ Normal(0,sqrt.(s)) for i in 1:length(x) x[i] ~ Normal(m, sqrt.(s)) end return (s, m)endCompiler design: sample(fname(x,y), sampler). fname(x=nothing,y=nothing; compiler=compiler) = begin ex = quote # Pour in kwargs...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/docs/library/",
        "teaser":null},{
        "title": "Get Started",
        "excerpt":"Installation To use Turing, you need install Julia first and then install Turing. Install Julia You will need to install Julia 1.0, which you can get from the official Julia website. Install Turing.jl Turing is an officially registered Julia package, so the following will install a stable version of Turing...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/docs/get-started",
        "teaser":null},{
        "title": "Documenation",
        "excerpt":"This is the documentation for Turing.jl. ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/docs/",
        "teaser":null},]
