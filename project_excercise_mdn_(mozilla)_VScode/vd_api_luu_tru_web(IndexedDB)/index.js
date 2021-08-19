//deo bt loi j
// Create needed constants
const list = document.querySelector("ul");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const form = document.querySelector("form");
const submitBtn = document.querySelector("form button");

//1. thiet lap co so du lieu ban dau
//tao dt db de luu tru csdl
let db;

//Lưu ý : Số phiên bản rất quan trọng. Nếu bạn muốn nâng cấp cơ sở dữ liệu của mình (ví dụ: bằng cách thay đổi cấu trúc bảng),
//bạn phải chạy lại mã của mình với số phiên bản tăng lên, lược đồ khác được chỉ định bên trong onupgradeneeded trình xử lý (xem bên dưới), v.v. Chúng tôi sẽ không đề cập đến việc nâng cấp cơ sở dữ liệu trong hướng dẫn đơn giản này.

//đảm bảo không sử dụng chức năng IndexedDB trước khi ứng dụng tải xong hoàn toàn (có thể bị lỗi nếu không làm vậy) .
window.onload = function () {
  //tao request mo 1 csdl notes_db neu chua ton tai thi tao la hd csdl la k dong bo
  //Để xử lý điều này trong IndexedDB, tạo một đối tượng request. Sau đó, sử dụng các trình xử lý sự kiện để chạy mã khi yêu cầu hoàn thành, không thành công, v.v.,
  let request = window.indexedDB.open("notes_db", 1);

  //xu li loi
  request.onerror = function () {
    console.log("Database failed to open");
  };
  //thanh cong
  request.onsuccess = function () {
    console.log("Database opened successfully");

    //luu csdl vao bien db (đối tượng đại diện cho cơ sở dữ liệu đã mở sẽ có sẵn trong thuộc request.result tính)
    db = request.result;

    //xuat dl da co trong IDB
    displayData();
  };

  //tlap csdl neu chua
  //Đây là nơi chúng tôi xác định lược đồ (cấu trúc) của cơ sở dữ liệu của chúng tôi;
  //nghĩa là tập hợp các cột (hoặc trường) mà nó chứa.
  request.onupgradeneeded = function (e) {
    //lay tham chieu den csdl da mo(tt result của target của sự kiện ( e.target.result), là đối tượng request.
    //Điều này tương đương với dòng db = request.result; bên trong onsuccess trình xử lý, nhưng chúng ta cần thực hiện điều này riêng biệt ở đây vì
    //onupgradeneededtrình xử lý (nếu cần) sẽ chạy trước onsuccess trình xử lý, có nghĩa là db giá trị sẽ không có sẵn nếu chúng ta không làm điều này.)
    let db = e.target.result;

    //Tạo một objectStore để lưu trữ các ghi chú của chúng ta notes_os(về cơ bản giống như một trong hệ thống cơ sở dữ liệu thông thường)
    // bao gồm một key tự động tang
    let objectStore = db.createObjectStore("notes_os", {
      keyPath: "id", //là khóa,trường id sẽ được sử dụng để xác định duy nhất các bản ghi, chẳng hạn như khi xóa hoặc hiển thị một bản ghi.
      autoIncrement: true,
    });

    //Xác định các mục dữ liệu mà objectStore sẽ chứa
    objectStore.createIndex("title", "title", { unique: false }); // chua tieu de
    objectStore.createIndex("body", "body", { unique: false }); //chua nd

    console.log("Database setup complete");
  };

  /* Vì vậy, với lược đồ cơ sở dữ liệu đơn giản này được thiết lập,
  khi chúng ta bắt đầu thêm các bản ghi vào cơ sở dữ liệu;
  mỗi cái sẽ được biểu diễn dưới dạng một đối tượng dọc theo các dòng sau:
  
{
  title: "Buy milk",
  body: "Need both cows milk and soy.",
  id: 8
}
*/

  //2. them dl vao csdl
  //diều này sẽ được thực hiện bằng cách sử dụng biểu mẫu trên trang
  form.onsubmit = addData;

  function addData(e) {
    e.preventDefaut();

    //tao dt dai dien 1 ban ghi de nhap vao csdl
    let newItem = { title: titleInput.value, body: bodyInput.value };
    //mo gia dich(transaction) readwrite voi dt notes_os = cach dung IDBDatabase.transaction()
    //cho phep truy cap kkho luu tru de lm viec vd tao ban ghi moi
    let transaction = db.transaction(["notes_os"], "readwrite");
    //truy cap kho dt = IDBTransaction.objectStore()luu kq trong objectStore
    let objectStore = transaction.objectStore("notes_os");
    //them ban ghi moi vao kho sd IDBObjectStore.add() =. tao dt request giong trc day
    let request = objectStore.add(newItem);
    //them cac trinh xl sk
    request.onsuccess = function () {
      titleInput.value = "";
      bodyInput.value = "";
    };

    transaction.oncomplete = function () {
      console.log("Transaction completed: database modification finished.");
      displayData(); //xong thi xuat dl ra
    };
    transaction.onerror = function () {
      console.log("Transaction not opened due to error");
    };
  }

  //3. hien thi dl
  function displayData() {
    //chúng tôi làm trống <ul>nội dung của phần tử, trước khi điền vào nội dung đã cập nhật.
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    //chúng tôi nhận được một tham chiếu đến notes_oscửa hàng đối tượng bằng cách sử dụng IDBDatabase.transaction()và IDBTransaction.objectStore()giống như chúng tôi đã làm trong đó addData()
    // let objectStore = db.transaction(["notes_os"],'readwrite').objectStore("notes_os");
    let objectStore = db.transaction("notes_os").objectStore("notes_os");
    //sử dụng IDBObjectStore.openCursor()phương thức để mở một yêu cầu cho con trỏ
    //là một cấu trúc sử dụng để lặp qua các bản ghi trong một kho lưu trữ đối tượng
    objectStore.openCursor().onsuccess = function (e) {
      //uối dòng này để làm cho mã ngắn gọn hơn - khi con trỏ được trả về thành công  trình xử lý sẽ được chạy.
      //nhận một tham chiếu đến chính con trỏ (một IDBCursorđối tượng)
      let cursor = e.target.result;

      //ktra ctro co chua ban ghi dl k
      if (cursor) {
        //co
        //tao dom dien dl vao trong
        const listItem = document.createElement("li");
        const h3 = document.createElement("h3");
        const para = document.createElement("p");

        listItem.appendChild(h3);
        listItem.appendChild(para);
        list.appendChild(listItem);

        h3.textContent = cursor.value.title;
        para.textContent = cursor.value.body;

        listItem.setAttribute("data-note-id", cursor.value.id);

        //nut xoa
        const deleteBtn = document.createElement("button");
        listItem.appendChild(deleteBtn);
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = deleteItem;
        //sử dụng IDBCursor.continue()phương thức để đưa con trỏ tới bản ghi tiếp theo trong kho dữ liệu và chạy lại nội dung của ifkhối.
        //Nếu có một bản ghi khác để lặp lại, điều này khiến nó được chèn vào trang và sau đó continue()được chạy lại, v.v.
        cursor.continue();
      } else {
        //khi không còn bản ghi nào để lặp lại, cursor sẽ trả về undefined, và => khoi else chay
        if (!list.firstChild) {
          //ktra xem co ghichu nao dc chen vao ul
          const listItem = document.createElement("li");
          listItem.textContent = "No note stored.";
          list.appendChild(listItem);
        }
        console.log("Note all displaayed");
      }
    };
  }

  //4. xoa ghi chu
  function deleteItem(e) {
    //truy xuất ID của bản ghi sẽ bị xóa bằng Number(e.target.parentNode.getAttribute('data-note-id'))
    //ID của bản ghi đã được lưu trong một data-note-id thuộc tính <li>khi nó được hiển thị lần đầu tiên.
    // vi la chuoi =>dung lop Number() chuyen no thanh so
    let noteId = Number(e.target.parentNode.getAttribute("data-note-id"));

    let transaction = db.transaction(["notes_os"], "readwrite");
    let objectStore = transaction.objectStore("notes_os");
    let request = objectStore.delete(noteId);

    // nhận tham chiếu đến kho lưu trữ đối tượng
    //sử dụng IDBObjectStore.delete()phương pháp để xóa bản ghi khỏi cơ sở dữ liệu, chuyển cho nó ID.
    transaction.oncomplete = function () {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log("Note " + noteId + " deleted.");
      //xóa ghi chú <li>khỏi DOM và thực hiện lại kiểm tra xem <ul>hiện tại có trống không, chèn ghi chú nếu thích hợp.
      if (!list.firstChild) {
        let listItem = document.createElement("li");
        listItem.textContent = "No notes stored.";
        list.appendChild(listItem);
      }
    };
  }
};
// // Create needed constants
// const list = document.querySelector('ul');
// const titleInput = document.querySelector('#title');
// const bodyInput = document.querySelector('#body');
// const form = document.querySelector('form');
// const submitBtn = document.querySelector('form button');

// // Create an instance of a db object for us to store the open database in
// let db;

// window.onload = function() {
//   // Open our database; it is created if it doesn't already exist
//   // (see onupgradeneeded below)
//   let request = window.indexedDB.open('notes_db', 1);

//   // onerror handler signifies that the database didn't open successfully
//   request.onerror = function() {
//     console.log('Database failed to open');
//   };

//   // onsuccess handler signifies that the database opened successfully
//   request.onsuccess = function() {
//     console.log('Database opened succesfully');

//     // Store the opened database object in the db variable. This is used a lot below
//     db = request.result;

//     // Run the displayData() function to display the notes already in the IDB
//     displayData();
//   };

//   // Setup the database tables if this has not already been done
//   request.onupgradeneeded = function(e) {

//     // Grab a reference to the opened database
//     let db = e.target.result;

//     // Create an objectStore to store our notes in (basically like a single table)
//     // including a auto-incrementing key
//     let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement:true });

//     // Define what data items the objectStore will contain
//     objectStore.createIndex('title', 'title', { unique: false });
//     objectStore.createIndex('body', 'body', { unique: false });

//     console.log('Database setup complete');
//   };

//   // Create an onsubmit handler so that when the form is submitted the addData() function is run
//   form.onsubmit = addData;

//   // Define the addData() function
//   function addData(e) {
//     // prevent default - we don't want the form to submit in the conventional way
//     e.preventDefault();

//     // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
//     let newItem = { title: titleInput.value, body: bodyInput.value };

//     // open a read/write db transaction, ready for adding the data
//     let transaction = db.transaction(['notes_os'], 'readwrite');

//     // call an object store that's already been added to the database
//     let objectStore = transaction.objectStore('notes_os');

//     // Make a request to add our newItem object to the object store
//     var request = objectStore.add(newItem);
//     request.onsuccess = function() {
//       // Clear the form, ready for adding the next entry
//       titleInput.value = '';
//       bodyInput.value = '';
//     };

//     // Report on the success of the transaction completing, when everything is done
//     transaction.oncomplete = function() {
//       console.log('Transaction completed: database modification finished.');

//       // update the display of data to show the newly added item, by running displayData() again.
//       displayData();
//     };

//     transaction.onerror = function() {
//       console.log('Transaction not opened due to error');
//     };
//   }

//   // Define the displayData() function
//   function displayData() {
//     // Here we empty the contents of the list element each time the display is updated
//     // If you ddn't do this, you'd get duplicates listed each time a new note is added
//     while (list.firstChild) {
//       list.removeChild(list.firstChild);
//     }

//     // Open our object store and then get a cursor - which iterates through all the
//     // different data items in the store
//     let objectStore = db.transaction('notes_os').objectStore('notes_os');
//     objectStore.openCursor().onsuccess = function(e) {
//       // Get a reference to the cursor
//       let cursor = e.target.result;

//       // If there is still another data item to iterate through, keep running this code
//       if(cursor) {
//         // Create a list item, h3, and p to put each data item inside when displaying it
//         // structure the HTML fragment, and append it inside the list
//         const listItem = document.createElement('li');
//         const h3 = document.createElement('h3');
//         const para = document.createElement('p');

//         listItem.appendChild(h3);
//         listItem.appendChild(para);
//         list.appendChild(listItem);

//         // Put the data from the cursor inside the h3 and para
//         h3.textContent = cursor.value.title;
//         para.textContent = cursor.value.body;

//         // Store the ID of the data item inside an attribute on the listItem, so we know
//         // which item it corresponds to. This will be useful later when we want to delete items
//         listItem.setAttribute('data-note-id', cursor.value.id);

//         // Create a button and place it inside each listItem
//         const deleteBtn = document.createElement('button');
//         listItem.appendChild(deleteBtn);
//         deleteBtn.textContent = 'Delete';

//         // Set an event handler so that when the button is clicked, the deleteItem()
//         // function is run
//         deleteBtn.onclick = deleteItem;

//         // Iterate to the next item in the cursor
//         cursor.continue();
//       } else {
//         // Again, if list item is empty, display a 'No notes stored' message
//         if(!list.firstChild) {
//           const listItem = document.createElement('li');
//           listItem.textContent = 'No notes stored.'
//           list.appendChild(listItem);
//         }
//         // if there are no more cursor items to iterate through, say so
//         console.log('Notes all displayed');
//       }
//     };
//   }

//   // Define the deleteItem() function
//   function deleteItem(e) {
//     // retrieve the name of the task we want to delete. We need
//     // to convert it to a number before trying it use it with IDB; IDB key
//     // values are type-sensitive.
//     let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

//     // open a database transaction and delete the task, finding it using the id we retrieved above
//     let transaction = db.transaction(['notes_os'], 'readwrite');
//     let objectStore = transaction.objectStore('notes_os');
//     let request = objectStore.delete(noteId);

//     // report that the data item has been deleted
//     transaction.oncomplete = function() {
//       // delete the parent of the button
//       // which is the list item, so it is no longer displayed
//       e.target.parentNode.parentNode.removeChild(e.target.parentNode);
//       console.log('Note ' + noteId + ' deleted.');

//       // Again, if list item is empty, display a 'No notes stored' message
//       if(!list.firstChild) {
//         const listItem = document.createElement('li');
//         listItem.textContent = 'No notes stored.';
//         list.appendChild(listItem);
//       }
//     };
//   }

// };
