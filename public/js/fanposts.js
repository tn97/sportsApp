$(document).ready(function () {

  //AJAX GET POSTS
    // -> render posts dynamical
      // -> attach onclick
 let replyMode = false;

 $("#submit-post").on("click", () => {
  const subject = $("#subject").val().trim();
  const message = $("#text-message").val().trim();

  const logo = "./photos/eagles.gif"
  const timeStamp = moment().format("MM/DD/YYYY h:mma");
  const username = "LII41333733"

  let $post = `         
  <div class="post-message mt-3">
   <div class="row align-items-center m-2">
    <div class="col-md-2 col-sm-1">
     <img class="post-icon" src="./photos/eagles.gif">
    </div>
    <div class="col-md-10 col-sm-11">
     <h3 class="post-msg-sub">${subject}</h3>
     <p class="post-msg">${message}</p>
     <p class="text-center username subject mt-1 mb-2">${username} | ${timeStamp}
       <span class="rec ml-2 rec-button">Rec</span>
       <span class="reply ml-2 reply-button">Reply</span>
       <span class="view ml-2 view-button" data-toggle="modal" data-target=".bd-example-modal-lg">View Replies</span>
     </p>
   </div>
 </div>
</div>`

if (replyMode) {
 $("#submit-post").data("toggle", "modal")
 $("#submit-post").data("target", ".bd-example-modal-lg")




 $('.replies-div').append($post)





replyMode = false;
} else {

  $('.posts-div').append($post)
 }
  $('#subject').val("");
  $('#text-message').val("");

  replyMode = false;
  $(".outline-reply").animate({borderWidth: "0px"}, 0);

 })

 $("#clear-post").on("click", () => {
  $('#subject').val("");
  $('#text-message').val("");
 })

 $(document).on("click", "#reply-button", () => {

  replyMode = "true";
  $("html, body").animate({ scrollTop: "100px" }, "slow");
  $(".outline-reply").animate({borderWidth: "3px"}, 800);
  $("#post-command").text("Add a Reply")
})

 $('#view-button').on("click", () => {

  replyMode = false;
  console.log($(this))
  // $("view-subject").text("Add a Reply")
})




 });




 // Rec, replies, view replies