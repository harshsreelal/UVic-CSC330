const panel_width = 1000;
const panel_height = 1000;



window.addEventListener("load", makePhaseTwo);

// Lotsa magic numbers below...

function makePhaseTwo() {
    d3.json("languages-simpler.json").then(data => {
        const sortedLanguages = data.languages.sort((a, b) => a.name > b.name);

        const svg = d3.select("body")
        .append("svg")
        .attr("width", panel_width)
        .attr("height", panel_height);

        sortedLanguages.forEach((language, i) => {
            const y = (i * 45) + 25

            const langGroup = svg.append("g")
                .attr("class", "language-group");

            const langRect = langGroup.append("rect") 
                .attr("x", 30)
                .attr("y", i * 45)
                .attr("width", 180)
                .attr("height", 40)
                .attr("fill", "none")
                .attr("rx", 10)
                .attr("ry", 10);

            langGroup.append("text")
                .attr("id", "lang_name")
                .attr("x", 40)
                .attr("y", y)
                .attr("dominant-baseline", "middle")
                .attr("font-size", "16px")
                .attr("font-family", "Arial, sans-serif")
                .text(language.name);

            language.paradigm.forEach((paradigm, j) => {
                const box_x = (j * 220) + 230 

                langGroup.append("rect")
                    .attr("x", box_x)
                    .attr("y", i * 45)
                    .attr("width", 200)
                    .attr("height", 40)
                    .attr("fill", "blue")
                    .attr("rx", 10)
                    .attr("ry", 10);

                langGroup.append("text")
                    .attr("x", box_x + 100) 
                    .attr("y", y)
                    .attr("text-anchor", "middle") 
                    .attr("dominant-baseline", "middle")  
                    .attr("fill", "white")
                    .attr("font-size", "16px")
                    .attr("font-family", "Arial, sans-serif")
                    .text(paradigm);
            });

            const langDetail = langGroup.append("g")
                .attr("class", "details")
                .attr("visibility", "hidden");

            langDetail.append("rect")
                .attr("x", 250)
                .attr("y", i * 45)
                .attr("width", 200)
                .attr("height", 60)
                .attr("fill", "black")
                .attr("opacity", 0.75)
                .attr("rx", 10)
                .attr("ry", 10);

            langDetail.append("text")
                .attr("x", 260)
                .attr("y", y)
                .attr("fill", "white")
                .text(`Year: ${language.year}`);
                
            langDetail.append("text")
                .attr("x", 260)
                .attr("y", y + 20)
                .attr("fill", "white")
                .text(`Creator: ${language.creator}`);

            langGroup.on("click", function() { 
                langGroup.raise();
                var isVisible = langDetail.style("visibility") === "visible";
                langDetail.style("visibility", isVisible ? "hidden" : "visible");
            });
        });
    });
}