const  {sequelize,DataTypes} = require('../connection')

const studentProfileUpdateSetting = sequelize.define('sudent_profile_update_setting',{

  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  allow_editable_form_fields:{
    type:DataTypes.BOOLEAN
  },
  admission_date:{
    type:DataTypes.BOOLEAN
  },
  first_name:{
    type:DataTypes.BOOLEAN
  },
  last_name:{
    type:DataTypes.BOOLEAN
  },
  rte:{
    type:DataTypes.BOOLEAN
  },
  image:{
    type:DataTypes.BOOLEAN
  },
  mobileno:{
    type:DataTypes.BOOLEAN
  },
  email:{
    type:DataTypes.BOOLEAN
  },
  religion:{
    type:DataTypes.BOOLEAN
  },
  caste:{
    type:DataTypes.BOOLEAN
  },
  dob:{
    type:DataTypes.BOOLEAN
  },
  gender:{
    type:DataTypes.BOOLEAN
  },
  current_address:{
    type:DataTypes.BOOLEAN
  },
  permanent_address:{
    type:DataTypes.BOOLEAN
  },
  blood_group:{
    type:DataTypes.BOOLEAN
  },
 
  bank_account_no:{
    type:DataTypes.BOOLEAN
  },
  bank_name:{
    type:DataTypes.BOOLEAN
  },
  ifsc_code:{
    type:DataTypes.BOOLEAN
  },
  guardian_is:{
    type:DataTypes.BOOLEAN
  },
  father_name:{
    type:DataTypes.BOOLEAN
  },
  father_phone:{
    type:DataTypes.BOOLEAN
  },
  father_occupation:{
    type:DataTypes.BOOLEAN
  },
  mother_name:{
    type:DataTypes.BOOLEAN
  },
  mother_phone:{
    type:DataTypes.BOOLEAN
  },
  mother_occupation:{
    type:DataTypes.BOOLEAN
  },
  gaurdian_name:{
    type:DataTypes.BOOLEAN
  },
  gaurdian_phone:{
    type:DataTypes.BOOLEAN
  },
  gaurdian_occupation:{
    type:DataTypes.BOOLEAN
  },
  gaurdian_email:{
    type:DataTypes.BOOLEAN
  },
  gaurdian_relation:{
    type:DataTypes.BOOLEAN
  },
  gaurdian_address:{
    type:DataTypes.BOOLEAN
  },
   gaurdian_photo:{
    type:DataTypes.BOOLEAN
  },
  father_pic:{
    type:DataTypes.BOOLEAN
  },
  mother_pic:{
    type:DataTypes.BOOLEAN
  },
  gaurdian_pic:{
    type:DataTypes.BOOLEAN
  },
  previous_school:{
    type:DataTypes.BOOLEAN
  },
  height:{
    type:DataTypes.BOOLEAN
  },
  weight:{
    type:DataTypes.BOOLEAN
  },
  house_id:{
    type:DataTypes.BOOLEAN
  }

})
.afterSync(()=>{

  studentProfileUpdateSetting.findByPk(1).then(async(resp)=>{

    if(!resp)
   await studentProfileUpdateSetting.create({
      allow_editable_form_fields:false,
      admission_date:false,
      first_name:false,
      last_name:false,
      rte:false,
      image:false,
      mobileno:false,
      email:false,
      religion:false,
      caste:false,
      dob:false,
      gender:false,
      current_address:false,
      permanent_address:false,
      blood_group:false,
      bank_account_no:false,
      bank_name:false,
      ifsc_code:false,
      guardian_is:false,
      father_name:false,
      father_phone:false,
      father_occupation:false,
      mother_name:false,
      mother_phone:false,
      mother_occupation:false,
      gaurdian_name:false,
      gaurdian_phone:false,
      gaurdian_occupation:false,
      gaurdian_email:false,
      gaurdian_relation:false,
      gaurdian_address:false,
       gaurdian_photo:false,
      father_pic:false,
      mother_pic:false,
      gaurdian_pic:false,
      previous_school:false,
      height:false,
      weight:false,
      house_id:false
    })


  })

})

module.exports = studentProfileUpdateSetting