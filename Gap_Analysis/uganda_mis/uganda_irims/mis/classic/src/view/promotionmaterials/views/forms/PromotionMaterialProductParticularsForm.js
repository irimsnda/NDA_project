Ext.define('Admin.view.promotionmaterials.views.forms.PromotionMaterialProductParticularsForm', {
    extend: 'Ext.form.Panel',
    xtype: 'promotionmaterialproductparticularsform',
    controller: 'promotionmaterialviewcontroller',
	
    frame: true,

	layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        columnWidth:0.33
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
		
		{
            xtype: 'combo',
            fieldLabel: 'Is Registered',
            name: 'is_registered',
            store: 'confirmationstr',
			allowBlank:false,
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            listeners:{
                afterrender: function(){
                    var store=this.getStore();
                    store.removeAll();
                    store.load();
                },
				
			 change:function(combo,value)
			 {
						var brand_name_txt=combo.up('form').down('textfield[name=brand_name]'),
						  registration_no=combo.up('form').down('textfield[name=registration_no]'),
						  registranttxt=combo.up('form').down('textfield[name=registrant_name]'),
						  common_name_id_combo=combo.up('form').down('combobox[name=common_name_id]'),
						 link_registered_product_btn=combo.up('form').down('button[name=link_registered_product]');
						  
						if(value==1)
						 {
							 
							/*   brand_name_txt.setReadOnly(true);
							  registranttxt.setReadOnly(true);
							  registration_no.setReadOnly(true);
							  common_name_id_combo.setReadOnly(true); */
							  
							  link_registered_product_btn.enable();
						 }else{
							  brand_name_txt.setValue("");
							  registration_no.setValue("");
							  common_name_id_combo.setValue("");
							  registranttxt.setValue("");
							     brand_name_txt.setReadOnly(false);
								common_name_id_combo.setReadOnly(false);
								registration_no.setReadOnly(false);
								registranttxt.setReadOnly(false); 
								
								link_registered_product_btn.disable();
								
						}
			 }
			
            }
			
        },
		
		{
            xtype: 'fieldcontainer',
			readOnly:true,
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Registered No',
            items: [
                {
                    xtype: 'textfield',
                    name: 'registration_no',
                    readOnly: true,
                    columnWidth: 0.9
                },
                {
					bind:{disabled:'readOnly'},
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    tooltip: 'Link Applicant',
                    name: 'link_registered_product',
				    disabled:true,
				    handler: 'showRegistererdProductSelectionList',
					
                }
            ]
        },
		{
		
            xtype: 'combo',
            fieldLabel: 'Generic Name',
            name: 'common_name_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_common_names'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, 
		
		{
			readOnly:true,
			xtype:'textfield',
			name:'brand_name',
			fieldLabel:'Brand Name(Product Name)'
		},
		
		{
			readOnly:true,
			xtype:'textfield',
			name:'registrant_name',
			fieldLabel:'Registrant'
		},
		{
			xtype:'textarea',
			name:'other_details',
			colSpan:3,
			fieldLabel:'Other Details'
		}
    ],
    buttons: [
        {
			//bind:{disabled:'readOnly'},
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_promotion_prod_particulars',
            storeID: 'promotionmaterialproductparticularstr',
            action_url: 'promotionmaterials/insertUpdateProductParticulars',
			action:'save_product_particulars'
			//bind:{disabled:'readOnly'}
			

        },
		{
			//bind:{disabled:'readOnly'},
            xtype: 'button',
            text: 'Clear',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});