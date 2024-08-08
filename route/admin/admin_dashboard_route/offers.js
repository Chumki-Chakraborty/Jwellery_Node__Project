const express=require('express')
const { admin_offer_page, Add_offer_Page, post_offer, edit_offer_page, update_offer_page, Delete_offer_page } = require('../../../controller/admin/dashboard_controller/offers')
const admin_offers=express.Router()
const offerimgupload=require('../../../utilits/offerimg')
const { jwt_adminauth } = require('../../../middleware/auth')
const { Admin_AuthCheck } = require('../../../controller/admin/admin_auth_controller/admin_allauth')

admin_offers.get('/offer',jwt_adminauth,Admin_AuthCheck,admin_offer_page)
 admin_offers.get('/addoffer',jwt_adminauth,Admin_AuthCheck,Add_offer_Page)
// admin_offers.post('/post/offer',post_offer)
admin_offers.post('/post/offer',offerimgupload.single('image'),post_offer)
admin_offers.get('/edit/offer/:id',jwt_adminauth,Admin_AuthCheck,edit_offer_page)
// admin_offers.post('/update/offer/:id',update_offer_page)
admin_offers.post('/update/offer/:id',offerimgupload.single('image'),update_offer_page)
admin_offers.get('/delete/offer/:id',jwt_adminauth,Admin_AuthCheck,Delete_offer_page)

module.exports=admin_offers