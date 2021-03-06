//follow ajax
$(".follow").click(function(){
    var followers=document.getElementById("followers").innerHTML
    followers=JSON.parse(followers)+1
    $("#followers").html(followers)
    $(this).removeClass("btn-success")
    $(this).addClass("btn-danger")
    $(this).html(`unfollow`)
    $.post("/follow",{id:this.id},(data)=>{
        //console.log("followed")
    });
});

$(".unfollow").click(function(){
    var followers=document.getElementById("followers").innerHTML
    followers=JSON.parse(followers)-1
    $("#followers").html(followers)
    $(this).removeClass("btn-danger")
    $(this).addClass("btn-success")
    $(this).html(`Follow`)
    $.post('/unfollow',{id:this.id},(data)=>{
        //console.log("unfollowed");
    })
});

//Attendance Ajax starts Here 
$('.delBox').click(function () { 
    // (this.innerHTML=``)
    $(this).hide();
    //console.log(this.id);
    //console.log('ji');
        $.post('/attendance/delBox',{id:this.id},(id)=>{
            if(id){
               var id =this.id
               //console.log(id);
               $(`.${id}`).html(null);
            }
        });   

    
});



$('.present').click(async  function () { 
   //console.log('present');
   //console.log(this.id);
  //console.log('present');
    $.post('/attendance/present',{id:this.id},(NewSubject)=>{
       // console.log( NewSubject.present,NewSubject.absent,NewSubject.total,NewSubject.percentage);
       // console.log(NewSubject);
       // console.log(document.getElementsByClassName(`${NewSubject.id}`));
      
        $(`.${NewSubject.id}`).html(`
        <h4 class="card-title"> ${NewSubject.name}
            <span>
                <button ${NewSubject.id} class="delBox btn btn-danger">
                        X
                </button>
            </span>
        </h4>
        ${NewSubject.status}
        <div class="card-body">
            <p> Total Classes  : ${NewSubject.total}</p>
            <p> Present : ${NewSubject.present}</p>
            <p> Absent :${NewSubject.absent}</p>
        </div>
        <div class="card-footer">
            <button id="${NewSubject.id}" class="btn btn-success present">
                ✔
            </button>
            <button id="${NewSubject.id}" class="btn btn-danger absent" >
                ❌
            </button>
        </div>`);
    })
   
    
});

$('.absent').click(function(){
    $.post('/attendance/absent',{id:this.id},(NewSubject)=>{
        document.getElementsByClassName(`${NewSubject.id}`).innerHTML=`
        <h4 class="card-title"> ${NewSubject.name}
            <span>
                <button id="${NewSubject.id}" class="delBox btn btn-danger">
                        X
                </button>
            </span>
        </h4>
        ${NewSubject.status}
        <div class="card-body">
            <p> Total Classes  : ${NewSubject.total}</p>
            <p> Present : ${NewSubject.present}</p>
            <p> Absent :${NewSubject.absent}</p>
        </div>
        <div class="card-footer">
            <button id="${NewSubject.id}" class="btn btn-success present">
                ✔
            </button>
            <button id="${NewSubject.id}" class="btn btn-danger absent" >
                ❌
            </button>
        </div>`
        $(`.${NewSubject.id}`).html(`
        <h4 class="card-title"> ${NewSubject.name}
            <span>
                <button id="${NewSubject.id}" class="delBox btn btn-danger">
                        X
                </button>
            </span>
        </h4>
        ${NewSubject.status}
        <div class="card-body">
            <p> Total Classes  : ${NewSubject.total}</p>
            <p> Present : ${NewSubject.present}</p>
            <p> Absent :${NewSubject.absent}</p>
            </div>
        <div class="card-footer">
            <button id="${NewSubject.id}" class="btn btn-success present">
                ✔
            </button>
            <button id="${NewSubject.id}" class="btn btn-danger absent" >
                ❌
            </button>
        </div>`); 
    })
});