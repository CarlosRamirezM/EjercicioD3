const url =
  "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json";
const url2 =
  "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";
let data1 = [];
let data2 = [];

d3.json(url).then((d) => {
  data1 = d;
  console.log("data", data1);

  //RETO 1

  var margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg1 = d3
    .select("#canvas1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear().domain([0, 1000000]).range([0, width]);
  svg1
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  var y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data1.map(function (d) {
        return d.name;
      })
    )
    .padding(0.1);
  svg1.append("g").call(d3.axisLeft(y));

  svg1
    .selectAll()
    .data(data1)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d) {
      return y(d.name);
    })
    .attr("width", function (d) {
      return x(d.value);
    })
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2");
});


d3.json(url2).then((d) => {
    data2 = d;
    console.log(data2);
  
    var margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
    var svg1 = d3
      .select("#canvas2")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleLinear().domain([0, 35000]).range([0, width]);

      svg1
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data2.map((d) => d.lifeexpectancy)
      )
      .padding(0.1);
    svg1.append("g").call(d3.axisLeft(y));


    svg1
    .selectAll()
    .data(data2)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return x(d.purchasingpower);
      })
    .attr("cy", function (d) {
      return y(d.lifeexpectancy);
    })
    .attr("r", (d) => d.population/6000000)
    .style("fill", "#69b3a2");

    svg1
    .selectAll()
    .data(data2)
    .enter()
    .append("text")
    .attr("dx", function (d) {
        return x(d.purchasingpower);
      })
    .attr("dy", function (d) {
      return y(d.lifeexpectancy);
    })
    .attr("transform", "scale(0.9)")
    .text(function(d){return d.country})
  });