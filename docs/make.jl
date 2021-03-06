using Documenter, Turing
using LibGit2: clone

# Include the update_homepage function.
include("homepage-updater.jl")

# Get paths.
examples_path = joinpath(@__DIR__, joinpath("homepage", "_tutorials"))
source_path = joinpath(@__DIR__, "src")
build_relative = joinpath("homepage", "_docs")
build_path = joinpath(@__DIR__, build_relative)

isdir(examples_path) || mkpath(examples_path)

# Clone TuringTurorials
tmp_path = tempname()
mkdir(tmp_path)
clone("https://github.com/TuringLang/TuringTutorials", tmp_path)

# Move to markdown folder.
md_path = joinpath(tmp_path, "markdown")

# Copy the .md versions of all examples.
try
    println(md_path)
    for file in readdir(md_path)
        full_path = joinpath(md_path, file)
        target_path = joinpath(examples_path, file)
        println("Copying $full_path to $target_path")
        cp(full_path, target_path, force = true)
    end
catch e
    # println("Markdown copy error: $e")
    rethrow(e)
finally
    rm(tmp_path, recursive = true)
end

# Preprocess markdown files.
src_temp = mktempdir()
cp(source_path, src_temp, force = true)
yaml_dict = preprocess_markdown(source_path)

# Build documentation
try
    makedocs(
        build = build_relative
    )
catch e
    # Put back the original files in the event of an error.
    cp(src_temp, source_path, force = true)
    rm(src_temp, recursive = true)
    rethrow(e)
end

# Postprocess markdown files (put the YAML headers back in)
cp(src_temp, source_path, force = true)
rm(src_temp, recursive = true)
postprocess_markdown(build_path, yaml_dict, original = source_path)

# Define homepage update function.
page_update = update_homepage(
    "github.com/TuringLang/Turing.jl.git",
    "gh-pages",
    "homepage"
)

# # Deploy documentation.
# deploydocs(
#     repo = "github.com/TuringLang/Turing.jl.git",
#     target = "build",
#     deps = nothing,
#     make = nothing,
#     julia = "1.0"
# )
