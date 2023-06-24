
Ext.define('Admin.view.trader_accounts.views.forms.AbstractAccountsManagementFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'abstractaccountsmanagementfrm',
    autoScroll: true,
    controller: 'traderaccountsvctr',
    //layout: 'form',
    height: Ext.Element.getViewportHeight() - 118,
    bodyPadding: 8,
   
    layout: {
        type: 'table',
        columns: 3
    },
    layout: 'column',
    autoScroll: true,
    items: [{
        xtype:'fieldset',
        columnWidth: 1,
        title: 'Trader Account Details',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            allowBlank: false,
            columnWidth: 0.33,
        },
        layout: 'column',
        items :[{
            xtype: 'combo',
            fieldLabel: 'Account Type',
            name: 'traderaccount_type_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                             url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_traderaccount_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            fieldLabel: 'Email Address',
            name: 'email',
            vtype: 'email'
        },{
            fieldLabel: 'Trader Name',
            emptyText: 'Enter Trader/Applicant Name',
            name: 'name'
        },{
            fieldLabel: 'TIN No',
            name: 'tin_no',
            allowBlank: true,
            xtype: 'textfield',
            labelAlign: 'top'
        },{
            fieldLabel: 'Pacra Reg No',
            name: 'pacra_reg_no',
            allowBlank: true,
			hidden: true,
            xtype: 'textfield',
            labelAlign: 'top'
        }]
    },{
        xtype:'fieldset',
        columnWidth: 1,
        title: 'Contacts & Location Details',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            allowBlank: false,
            columnWidth: 0.33,
        },
        layout: 'column',
        items :[{ 
            fieldLabel: 'Country',
            name: 'country_id',
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                             url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_countries'
                            }
                        }
                    },
                    isLoad: true
                },
                change:function(cbo, value){
                    var form = cbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore();
    
                        filter = {
                                country_id: value
                        };
                        filter = JSON.stringify(filter);
                        regionStore.removeAll();
                        regionStore.load({params:{filters:filter}});
                       
                }
            }
        }, {
            fieldLabel: 'Region',
            name: 'region_id',
            xtype: 'combo',
            forceSelection: true,
            queryMode: 'local',
            allowBlank: true,
           
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                             url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_regions'
                            }
                        }
                    },
                    isLoad: true
                },
                change:function(cbo, value){
                    var form = cbo.up('form'),
                        districtStore = form.down('combo[name=district_id]').getStore();
                        filter = {
                                region_id: value
                        };
                        filter = JSON.stringify(filter);
                        districtStore.removeAll();
                        districtStore.load({params:{filters:filter}});
                }
            }
        }, {
            fieldLabel: 'District(Optional)',
            name: 'district_id',
            xtype: 'combo',
           queryMode: 'local',
            forceSelection: true,
            displayField: 'name',allowBlank: true,
           
            valueField: 'id', 
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                             url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_districts'
                            }
                        }
                    },
                    isLoad: true
                },
            }
        }, {
            fieldLabel: 'Postal Address',
            name: 'postal_address'
    
        }, {
            fieldLabel: 'Telephone NO',
            name: 'telephone_no'
    
        }, {
            fieldLabel: 'Mobile NO',
            name: 'mobile_no',
            xtype: 'textfield',
            labelAlign: 'top'
        },{
            fieldLabel: 'Physical Address',
            name: 'physical_address',
            columnWidth: 1,
            xtype: 'textarea'
        }]
    },{
        xtype:'fieldset',
        columnWidth: 1,
        title: 'Primary Contact Person Details',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            allowBlank: false,
            columnWidth: 0.33,
        },
        layout: 'column',
        items :[{
            fieldLabel: 'Contact Person',
            emptyText: 'Enter Contact Person',
            name: 'contact_person'
        }, {
            fieldLabel: 'Contact Person Email ',
            maxlength: 9,
            name: 'contact_person_email',
            vtype: 'email'
        },  {
            fieldLabel: 'Contact Person Telephone ',
            maxlength: 9,
            name: 'contact_person_telephone',
        }]
    }, {
        xtype:'fieldset',
        columnWidth: 1,
        title: 'Account Status',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            allowBlank: false,
            columnWidth: 0.33,
        },
        layout: 'column',
        items :[{
            fieldLabel: 'Account Status',
            name: 'status_id',
            xtype: 'combo',columnWidth: 0.33,
            valueField: 'id',
            value:1,
            readOnly: true,
            queryMode: 'local',
            allowBlank:false,
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                model_name: 'AccountStatuses'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }]
    }, {

        xtype: 'hiddenfield',
        name: 'id'
    },{

        xtype: 'hiddenfield',
        name: 'identification_no'
    },{

        xtype: 'hiddenfield',
        name: 'portal_id'
    }]
});