let courseBookArray = [];

function AddToBookBag(courseBookID)
{
    //console.log(courseBookID);
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

function findIndex(data, ID)
{
    for(let i = 0; i < data.length; i++)
    {
        if (data[i]._id == ID) return i;
    }

}

function ShowBookBag()
{
    $.get('/api/bookbag', {'courseBookArray[]': courseBookArray}, (data, status, jqXHR) => {
        console.log("successful api");
    }).done(() => {
        window.location.href = "/bookbag";
   })
}


function ShowBuyers(courseBookID, sellings, sold)
{
    let courseBook;
    $(".table-body").html("");
    
    //console.log(courseBookID);

    $.get(`/api/courses`, (results = {}) => {
        let data = results.data;
        
        if (!data) return;
 
        let index = findIndex(data, courseBookID);
        courseBook = data[index];
        // alert(courseBook.bookName);
    }).then(() => {
        $.get(`/api/users`, (results = {}) => {
            let data = results.data;
            
            if (!data) return;
            
            else if (sellings) {
                courseBook.potentialBuyersList.forEach(buyerID => {
                    let sellingIndex = findIndex(data, buyerID),
                        userItem = data[sellingIndex];
    
                    $(".table-body").append(
                    `<tr>
                        <td>
                            ${userItem.firstName}
                        </td>
                        <td>
                            ${userItem.lastName}
                        </td>
                        <td>
                            ${userItem.email} 
                        </td>
                        <td>
                            ${userItem.phoneNumber}
                        </td>
                    </tr>`
                    );
                })
            }
            else if (sold) {
            let soldIndex = findIndex(data, courseBook.buyerID),
            userItem = data[soldIndex];
    
            $(".table-body").append(
                `<tr>
                    <td>
                        ${userItem.firstName}
                    </td>
                    <td>
                        ${userItem.lastName}
                    </td>
                    <td>
                        ${userItem.email} 
                    </td>
                    <td>
                        ${userItem.phoneNumber}
                    </td>
                </tr>`
              );
            }
            else 
            {
                alert("No books to show!");
            }
        });
    })
}