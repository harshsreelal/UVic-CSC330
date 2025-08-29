const panel_width = 500;
const panel_height = 1000;



window.addEventListener("load", makePhaseOne);

// Lotsa magic numbers below...

function makePhaseOne() {
    d3.json("languages-simpler.json").then(data => {
        const sortedLanguages = data.languages.sort((a, b) => a.name > b.name);

        const svg = d3.select("body")
        .append("svg")
        .attr("width", panel_width)
        .attr("height", panel_height);

        sortedLanguages.forEach((language, i) => {
            const y = (i * 45) + 25

            svg.append("text")
                .attr("x", 20)
                .attr("y", y)
                .attr("dominant-baseline", "middle")
                .attr("font-size", "16px")
                .attr("font-family", "Arial, sans-serif")
                .text(language.name);

            svg.append("rect")
                .attr("x", 120)
                .attr("y", i * 45)
                .attr("width", 200)
                .attr("height", 40)
                .attr("fill", "blue")
                .attr("rx", 10)
                .attr("ry", 10);

            svg.append("text")
                .attr("x", 220) 
                .attr("y", y)
                .attr("text-anchor", "middle") 
                .attr("dominant-baseline", "middle")  
                .attr("fill", "white")
                .attr("font-size", "16px")
                .attr("font-family", "Arial, sans-serif")
                .text(language.paradigm[0]);
        });
    });
}