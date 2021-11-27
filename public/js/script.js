let courseBookArray = [];

function AddToBookBag(courseBookID)
{
    if(courseBookArray.includes(courseBookID))
    {
        return alert("You already added this book to the Book Bag.");
    }

    courseBookArray.push(courseBookID);
    alert("Successfully added to Book Bag!");

    for(let i = 0; i < courseBookArray.length; i++)
    {
        console.log(courseBookArray[i]);
    }
};

function findIndex(data, courseBookID)
{
    for(let i = 0; i < data.length; i++)
    {
        if (data[i]._id == courseBookID) return i;
    }

}

function ShowBookBag()
{
    $.get(`api/courses`, (results = {}) => {
        let data = results.data;
        
        if (!data) return;
        else if (courseBookArray.length != 0)
        {
            courseBookArray.forEach(courseBookID => {
                let index = findIndex(data, courseBookID);
                let courseBookItem = data[index];
                alert(courseBookItem.bookName);
            });
        }
        else 
        {
            alert("No books to show!");
        }
    });
};