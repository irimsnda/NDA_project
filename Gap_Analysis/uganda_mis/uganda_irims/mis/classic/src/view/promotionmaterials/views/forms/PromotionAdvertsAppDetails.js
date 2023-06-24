Ext.define('Admin.view.promotionmaterials.views.forms.PromotionAdvertsAppDetails', {
    extend: 'Ext.form.Panel',
    xtype: 'promotionAdvertsappdetails',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top'
    },
	
		 dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'top',
            margin: 3,
            items:[
                {
                    xtype: 'tbspacer',
                    width: 2
                },
                {
					bind:{disabled:'{readOnly}'},
					allowBlank:false,
                    xtype: 'combo',
                    fieldLabel: 'Zone',
                    labelWidth: 50,
                    width: 400,
                    name: 'zone_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Zone'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    },
                    labelStyle: 'font-weight:bold'
                }
            ]
        }
    ],
	
    items: [
	     {
            xtype: 'hiddenfield',
            name: 'sponsor_id'
        }, 
        {
            xtype: 'hiddenfield',
            name: 'applicant_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Applicant Name',
            items: [
                {
                    xtype: 'textfield',
                    name: 'applicant_name',
                    readOnly: true,
                    columnWidth: 0.9
                },
                {
					bind:{disabled:'{readOnly}'},
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    tooltip: 'Link Applicant',
                    name: 'link_applicant',
                    handler: 'showApplicantSelectionList'
                            
                }
            ]
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Contact Person',
            readOnly: true,
            name: 'contact_person'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'TIN',
            readOnly: true,
            name: 'TIN'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'app_country_id',
            store: 'countriesstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            readOnly: true,
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'app_region_id',
            store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            readOnly: true,
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'app_district_id',
            readOnly: true,
            store: 'districtsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            readOnly: true,
            name: 'app_physical_address'
        },
        {
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: 'Postal Address',
            name: 'postal_address'
        },
        {
            xtype: 'textfield',
			readOnly: true,
            fieldLabel: 'Telephone',
            name: 'app_telephone'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax',
			readOnly: true,
            name: 'app_fax'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
			readOnly: true,
            name: 'app_email'
        },
        {
            xtype: 'textfield',
            readOnly:true,
            fieldLabel: 'Website',
            name: 'app_website'
			
        },
		
		
		 {
			allowBlank:false,
            xtype: 'combo',
            fieldLabel: 'Classification',
            name: 'classification_id',
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
                                table_name: 'par_classifications'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, 
		
		
		 {
			allowBlank:false,
            xtype: 'combo',
            fieldLabel: 'Product Type Details',
            name: 'product_type_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_product_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, 
		
		{
		
			allowBlank:false,
            xtype: 'combo',
            fieldLabel: 'Applicant as sponsor',
            name: 'applicant_as_sponsor',
            store: 'confirmationstr',
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
				//applicantAsSponsorHandler
				change: function (cbo, value) {
					
					
				
				var btn=cbo.up('form').down('button[name=sponsor_id_btn]');
				  
				if(value==1)
				 {
					 
					  btn.disable(true);
				 }else{
					  
					  btn.enable();
		        }
				  
				 

               }
				
				
				
				
            },
			
        },
		
		{
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Sponsor Name',
            items: [
                {
                    xtype: 'textfield',
                    name: 'applicant_sponsor_name',
                    readOnly: true,
                    columnWidth: 0.9
                },
                {
					bind:{disabled:'readOnly'},
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    tooltip: 'Link to Sponsor',
                    name: 'sponsor_id_btn',
					//disabled:true,
                    handler: 'showSponsorSelectionList'
                }
            ]
        }
		
    ]
});