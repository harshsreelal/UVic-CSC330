const panel_width = 1000;
const panel_height = 1100;



window.addEventListener("load", makePhaseThree);

// Lotsa magic numbers below...

function makePhaseThree() {
    d3.json("languages-simpler.json").then(data => {
        const sortedLanguages = data.languages.sort((a, b) => a.name > b.name);

        const svg = d3.select("body")
        .append("svg")
        .attr("width", panel_width)
        .attr("height", panel_height);

        const languageList = {}; // Holds names of languages to later check for influence

        sortedLanguages.forEach((language, i) => {
            const y = (i * 45) + 25

            const langGroup = svg.append("g")
                .attr("class", "language-group");

            const langRect = langGroup.append("rect") // Rect for yellow background when hovering
                .attr("x", 30)
                .attr("y", i * 45)
                .attr("width", 180)
                .attr("height", 40)
                .attr("fill", "none")
                .attr("rx", 10)
                .attr("ry", 10);

            const langText = langGroup.append("text")
                .attr("x", 40)
                .attr("y", y)
                .attr("dominant-baseline", "middle")
                .attr("font-size", "16px")
                .attr("font-family", "Arial, sans-serif")
                .text(language.name);

            languageList[language.name] = langGroup; 

            language.paradigm.forEach((paradigm, j) => { // Create boxes for paradigms
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

            const langDetail = langGroup.append("g") // Includes info for onclick behavior
                .attr("class", "details")
                .attr("visibility", "hidden");

            langDetail.append("rect")
                .attr("x", 120)
                .attr("y", i * 45)
                .attr("width", 200)
                .attr("height", 60)
                .attr("fill", "black")
                .attr("opacity", 0.75)
                .attr("rx", 10)
                .attr("ry", 10);

            langDetail.append("text")
                .attr("x", 130)
                .attr("y", y)
                .attr("fill", "white")
                .text(`Year: ${language.year}`);
                
            langDetail.append("text")
                .attr("x", 130)
                .attr("y", y + 20)
                .attr("fill", "white")
                .text(`Creator: ${language.creator}`);

            langGroup.on("click", function() { 
                langGroup.raise();
                var isVisible = langDetail.style("visibility") === "visible";
                langDetail.style("visibility", isVisible ? "hidden" : "visible");
            });
            
            langText.on("mouseover", function() { 
                    langText.attr("font-weight", "bold")

                    langRect.transition()
                        .duration(300)
                        .attr("fill", "yellow")

                    if (language.influenced_by) {
                        language.influenced_by.forEach((influenced_lang) => {
                            if (languageList[influenced_lang]) {
                                languageList[influenced_lang].transition()
                                    .duration(800)
                                    .attr("transform", "translate(-20, 0)");
                            }
                        });
                    }

                    if (language.influences) {
                        language.influences.forEach((influencing_lang) => {
                            if (languageList[influencing_lang]) {
                                languageList[influencing_lang].transition()
                                    .duration(800)
                                    .attr("transform", "translate(20, 0)");
                            }
                        });
                    }
                        
                })
                
                .on("mouseout", function() {
                    langText.attr("font-weight", "normal")

                    langRect.transition()
                        .duration(300)
                        .attr("fill", "none")

                        if (language.influenced_by) {
                            language.influenced_by.forEach((influenced_lang) => {
                                if (languageList[influenced_lang]) {
                                    languageList[influenced_lang].transition()
                                        .duration(800)
                                        .attr("transform", "translate(0, 0)");
                                }
                            });
                        }

                        if (language.influences) {
                            language.influences.forEach((influencing_lang) => {
                                if (languageList[influencing_lang]) {
                                    languageList[influencing_lang].transition()
                                        .duration(800)
                                        .attr("transform", "translate(0, 0)");
                                }
                            });
                        }
                });
        });
    });
}