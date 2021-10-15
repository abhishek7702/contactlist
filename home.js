const express= require('express');
const path= require('path');
const port = 8000;

const db=require('./config/mongoose');
const Contact= require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList=[]

app.get('/',function(req,res){
    return res.render('home',{
        contact_list:contactList
    });
})


app.post('/contact',function(req,res){
    /*contactList.push(req.body);*/
  Contact.create({
      name:req.body.name,
      phone:req.body.phone
  },function(err,newContact){
      if(err){
          console.log(err,'errror in running');
       return;
    } console.log('*********',newContact);
 return res.redirect('back');
  })
});

app.get('/delete-contact',function(req,res){
    let phone=req.query.phone;
    let contactindex=contactList.findIndex(contact => contact.phone == phone);
    if(contactindex!= -1){
        contactList.splice(contactindex,1);
    }
        return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log('error is server',err);

    }else
    return console.log("server is up at port:",port);

})
