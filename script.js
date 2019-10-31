var penPromise = d3.json("penguins/classData.json")

penPromise.then(
function(data)
    {
        getQuiz(data);
        getL(data);
        ev(data);
        console.log("works",data);
    },
function(err)
    {
        console.log("ERROR",err);
    })

var screen = {width:500, height:500}

var getGrade = function(quiz)
{
    return quiz.grade;
}

var getQuiz = function(data)
{
    return data[0].quizes.map(getGrade); //need for all penguins, not just one
}

var getL = function(data)
{
    return getQuiz(data).length;
}

var ev = function(data)
{
    var xs = d3.range(getL(data))

    console.log("x",xs);

    var points = xs.map(
        function(x)
        {
            return {x:x, y:x}
        })
    
    console.log(points);
    
    var setup = function(points)
    {
        d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        var xscale = d3.scaleLinear()
            xscale.domain([0,d3.max(points,function(p){return p.x})])
            xscale.range([0,screen.width])
        var yscale = d3.scaleLinear()
            yscale.domain([d3.min(points,function(p){return p.y}),d3.max(points,function(p){return p.y})])
            yscale.range([screen.height,0])
    }
    
    var drawGraph = function(points,xScale,yScale)
    {
        d3.select("svg")
        .selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx",function(p){return xScale(p.x)})
        .attr("cy",function(p){return yScale(p.y)})
        .attr("r", 2)
    }
    
}
