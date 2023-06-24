Ext.define('Admin.view.configurations.views.forms.Study_sitesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'study_sitesFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'column',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        columnWidth: 0.33
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'study_sites',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Country',
        margin: '0 20 20 0',
        name: 'country_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        allowBlank: false,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_countries'
                        }
                    }
                   },
              isLoad: true
            },
            change: function(combo,newValue,old,eopts) {
               var form=this.up('form'),
                   regionStr=form.down('combo[name=region_id]').getStore();  
                   regionStr.removeAll();
                   var filters = JSON.stringify({'country_id':newValue});
                   regionStr.load({params:{filters:filters}}); 
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Region',
        margin: '0 20 20 0',
        name: 'region_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_regions'
                        }
                    }
                   },
              isLoad: false
            },
            change: function(combo,newValue,old,eopts) {
               var form=this.up('form'),
                   districtStr=form.down('combo[name=district_id]').getStore();  
                   districtStr.removeAll();
                   var filters = JSON.stringify({'region_id':newValue});
                   districtStr.load({params:{filters:filters}});
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Districts',
        margin: '0 20 20 0',
        name: 'district_id',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_districts'
                        }
                    }
                   },
              isLoad: false
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Physical Address',
        margin: '0 20 20 0',
        name: 'physical_address',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Postal Address',
        margin: '0 20 20 0',
        name: 'postal_address',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Telephone No',
        margin: '0 20 20 0',
        name: 'telephone',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Email Address',
        margin: '0 20 20 0',
        name: 'email_address',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_flagged',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'study_sites',
                    storeID: 'study_sitesStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});