var penPromise = d3.json("penguins/classData.json")

penPromise.then(
function(data)
    {
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

var getDay = function(data)
{
    return data[0].quizes.map(days);
}

var days = function(penguin)
{
    return penguin.day;
}

var startDay = 0;

var trackDay = function(change)
{
    day = startDay + change;
    startDay = day;
    return day;
}

var ev = function(data)
{
    var numPen = []
    for (i=0; i < data.length; i++)
        {
            numPen.push(i);
        }
    
    var getQuiz = function(data,num)
    {
        return data[num].quizes.map(getGrade);
    }
    
    var fullArray = [] //array of quizzes
        for (i=0; i < 23; i++)
            {
                var num = i
                var step = getQuiz(data,num)
                fullArray.push(step);
            }
        
    var pointsFunc = function(data,begDay)
    {    
        var xs = numPen;

        var points = xs.map(
            function(x)
            {
                return {x:x, y:fullArray[x][begDay]}
            })
        return points
    }
    
    var dayCounter = d3.select("body")
        .select("#dayCount")
        .text("Day 1")
        
    var setup = function(points)
    {
        var screen = {width:500, height:500}
                
        d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        var xscale = d3.scaleLinear()
            xscale.domain([0,d3.max(points,function(p){return p.x})])
            xscale.range([0,screen.width])
        var yscale = d3.scaleLinear()
            yscale.domain([d3.min(points,function(p){return p.y}),d3.max(points,function(p){return p.y})])
            yscale.range([screen.height,0])
        //console.log({"xscale": xscale, "yscale":yscale})
        return {"xscale": xscale, "yscale":yscale}
    }
    
    var drawGraph = function(points,xScale,yScale)
    {
        d3.select("svg")
        .selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("fill","blue")
        .attr("cx",function(p){return xScale(p.x)})
        .attr("cy",function(p){return yScale(p.y)})
        .attr("r", 7)
        .on("mouseover", function(d)
           {
                d3.select("body").select("#pen").text("Penguin: " + d.x)
                d3.select("body").select("#quiz").text("Quiz Grade: " + d.y)
           })
    }
    
    //draws start graph
    setup(pointsFunc(data,startDay));
    var xScale = setup(pointsFunc(data,startDay)).xscale;
    var yScale = setup(pointsFunc(data,startDay)).yscale;
    drawGraph(pointsFunc(data,startDay),xScale,yScale);
    
    var prevButton = d3.select("#prev")
        .on("click", function(d)
            {
                var numDay = trackDay(-1)

                    d3.select("svg").selectAll("circle")
                        .remove();    

                    var displayDay = numDay + 1;

                    var newPoints = pointsFunc(d,numDay)    

                    setup(newPoints);
                    var xScale = setup(newPoints).xscale;
                    var yScale = setup(newPoints).yscale;
                    drawGraph(newPoints,xScale,yScale);

                    d3.select("#dayCount")
                        .text("Day " + displayDay)
            })
    
    var nextButton = d3.select("#next")
        .on("click", function(d)
            {
                var numDay = trackDay(1)
           
                    d3.select("svg").selectAll("circle")
                        .remove(); 

                    var displayDay = numDay + 1;

                    var newPoints = pointsFunc(d,numDay)    

                    setup(newPoints);
                    var xScale = setup(newPoints).xscale;
                    var yScale = setup(newPoints).yscale;
                    drawGraph(newPoints,xScale,yScale);

                    d3.select("#dayCount")
                        .text("Day " + displayDay)
            })
}
