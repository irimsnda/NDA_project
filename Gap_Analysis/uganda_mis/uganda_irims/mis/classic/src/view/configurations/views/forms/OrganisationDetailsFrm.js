Ext.define('Admin.view.configurations.views.forms.OrganisationDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'organisationdetailsFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_organisation_information',
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
        xtype: 'textfield',
        fieldLabel: 'Republic',
        margin: '0 20 20 0',
        name: 'republic',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Ministry',
        margin: '0 20 20 0',
        name: 'ministry',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Email_address',
        margin: '0 20 20 0',
        name: 'email_address',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Physical_address',
        margin: '0 20 20 0',
        name: 'physical_address',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Postal_address',
        margin: '0 20 20 0',
        name: 'postal_address',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Telephone_nos',
        margin: '0 20 20 0',
        name: 'telephone_nos',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Fax',
        margin: '0 20 20 0',
        name: 'fax',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'website',
        margin: '0 20 20 0',
        name: 'Website',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Zone',
        margin: '0 20 20 0',
        name: 'zone_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_zones'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
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
                    table_name: 'tra_organisation_information',
                    storeID: 'organisationdetailsStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});