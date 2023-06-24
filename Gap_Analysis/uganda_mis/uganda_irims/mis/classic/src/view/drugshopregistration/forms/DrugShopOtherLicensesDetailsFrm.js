
Ext.define('Admin.view.drugshopregistration.views.forms.DrugShopOtherLicensesDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugshopotherlicensesdetailsfrm',
    itemId: 'drugshopotherlicensesdetailsfrm',
    autoScroll: true,
    controller: 'premiseregistrationvctr',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        labelAlign: 'right',
        labelWidth: 135,
        margin: 5,
        xtype: 'textfield',
        width: '100%',
    },
    layout: {
        type: 'vbox'
    },
    layout: 'vbox',
    items: [{ 
            xtype: 'hidden',
            name: 'application_code'
        },{
            xtype: 'hidden',
            name: '_token',
            value: token
        },
        {
            xtype: 'hidden',
            name: 'premise_id'
        }, {   
            xtype: 'hiddenfield',
            name: 'applicant_id',
        },{
            xtype: 'hidden',
            name: 'requested_by'
        },{ 
            xtype: 'hidden',
            name: 'previous_approval_date'
        },
        {
            xtype: 'hidden',
            name: 'previous_expiry_date'
        },{
            xtype: 'hidden',
            name: 'previous_personnel_id'
        },{
            xtype: 'hidden',
            name: 'table_name',
            value: 'tra_permitdetailsammendment_requests'  
        },{
          xtype:'panel',
          layout:{
              type:'column',
              columns:2
          },
          items:[{
              xtype: 'textfield',
              fieldLabel:'Premise Details',
              allowBlank: false,
              readOnly: true,
              labelAlign: 'right',
              labelWidth: 135,
              name: 'name',
              columnWidth: 0.9
          },{
                xtype: 'button',
                columnWidth: 0.1,
                tooltip: '  Select Premise',
                iconCls: 'x-fa fa-link',
                childXtype: 'showotherpremisepermitdetailsGrid',
                winTitle: 'Approved Premises',
                winWidth: '90%',
                handlerFn: 'loadSelectedAmmendmentPremise',
                handler: 'showOtherPremiseSearch'
          }]
    },
      
       {
            xtype: 'textfield',
            fieldLabel: 'Permit No',
            name: 'permit_no',
            readOnly: true
         },
           {
            xtype: 'datefield',
            format: 'Y-m-d H:i:s',
             disabled:true,
            altFormats: 'Y-m-d H:i:s|Y-m-d',
            name: 'approval_date',
            fieldLabel: 'Approval Date',
            allowBlank: false
        },
       {
            xtype: 'datefield',
            format: 'Y-m-d H:i:s',
             disabled:true,
            altFormats: 'Y-m-d H:i:s|Y-m-d',
            name: 'expiry_date',
            fieldLabel: 'Expiry Date',
            allowBlank: false
         }
       
       ],
    buttons: [{
        text: 'Update Application Details',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        formBind: true,
        action_url: 'applicationdetailsamendment/savePermitAmmendmentApplicationsDetails',
        handler: 'updateApplicationAmmendmentDetails',
        table_name: 'tra_permitdetailsammendment_requests',
        storeID: 'premisepermitdetailsammendmentsgridstr'
    }]
});