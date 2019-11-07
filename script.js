var penPromise = d3.json("penguins/classData.json")

penPromise.then(
function(data)
    {
        getQuiz(data);
        //getL(data);
        ev(data);
        getDay(data);
        console.log("Penguins",data);
    },
function(err)
    {
        console.log("ERROR",err);
    })

var getGrade = function(quiz)
{
    return quiz.grade;
}

var getQuiz = function(penguin)
{
    return penguin[0].quizes.map(getGrade); //need for all penguins, not just one
}

/*var getL = function(data)
{
    console.log(getQuiz(data).length)
    return getQuiz(data).length;
} */

var getDay = function(data)
{
    console.log("Days", data[0].quizes.map(days))
    return data[0].quizes.map(days);
}

var days = function(penguin)
{
    return penguin.day;
}

var startDay = 1;

var trackDay = function(change)
{
    day = startDay + change;
    startDay = day;
    return day;
}

var ev = function(data)
{
    var xs = getDay(data) //d3.range(getDay(data))

    console.log("x",xs);

    var points = xs.map(
        function(x)
        {
            return {x:x, y:x}
        })
    
    console.log("Points", points);
    
    var dayCounter = d3.select("body")
        .append("p")
        .attr("id","counter")
        .text("Day " + trackDay(0))
        
    var setup = function(points)
    {
        var screen = {width:500, height:500}
        
        console.log(screen.width)
        
        d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        var xscale = d3.scaleLinear()
            xscale.domain([0,d3.max(points,function(p){return p.x})])
            xscale.range([0,screen.width])
        var yscale = d3.scaleLinear()
            yscale.domain([d3.min(points,function(p){return p.y}),d3.max(points,function(p){return p.y})])
            yscale.range([screen.height,0])
        console.log({"xscale": xscale, "yscale":yscale})
        return {"xscale": xscale, "yscale":yscale}
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
    
    var prevButton = d3.select("#prev")
        .on("click", function(d)
            {
                d3.select("#counter")
                    .text("Day " + trackDay(-1))
            })
    
    var nextButton = d3.select("#next")
        .on("click", function(d)
            {
                d3.select("#counter")
                    .text("Day " + trackDay(1))
            })
    
    //drawsGraph
    setup(points);
    var xScale = setup(points).xscale;
    var yScale = setup(points).yscale;
    drawGraph(points,xScale,yScale);

}
