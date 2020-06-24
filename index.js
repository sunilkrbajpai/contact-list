const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

/*
var contactList=[
    {
        name:"Sunil",
        phone:"9409509"
    },
    {
        name:"arpan",
        phone:"3839342"
    },
    {
        name:"hello",
        phone:"8932894389"
    },
    {
        name:"shreya",
        phone:"89489"
    }
]
*/
app.get('/',function(req,res)
{
    Contact.find({},function(err,contacts)
    {
        if(err)
        {
            console.log('Error in fetching data');
            return;
        }
        return res.render('home',{ 
        title:'My Phone Book',
        contact_list:contacts
    });
  });
});

app.post('/create_newcontact',function(req,res){
    // contactList.push(req.body);
    Contact.create(req.body,function(err,newContact){
        if(err)
        {
            console.log('error in creating a contact');
            return;
        }
        console.log('********',newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact',function(req,res)
{
    //console.log(req.query);
    let id=req.query.id;
    //let name=req.query.name;
    // let contactIndex=contactList.findIndex(contact=> contact.phone==phone)
    // if(contactIndex!=-1)
    // {
    //     contactList.splice(contactIndex,1);
    // }
    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log('error in deleting the contact');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err)
        console.log('Error in running the server',err);
    console.log('Yup! server is running at port:',port);
});
