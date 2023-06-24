/**
 * Created by Kip on 9/17/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.ExternalUsersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'externalusersfrm',
    autoScroll: true,
    controller: 'workflowmanagementvctr',
    layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wf_workflow_statuses',
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
    }, {
        xtype: 'textfield',
        fieldLabel: 'Full Names',
        margin: '0 20 20 0',
        name: 'fullnames'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Email Address',
        vtype:'email',
        margin: '0 20 20 0',
        name: 'email'
    },{
        xtype: 'textfield',
        fieldLabel: 'Mobile No',
        margin: '0 20 20 0',
        name: 'mobile'
    },{
        xtype: 'textfield',
        fieldLabel: 'Postal Address(Optional)',
        margin: '0 20 20 0',
        name: 'postal_address'
    },{
        xtype: 'combo',
        name: 'country_id',
        allowBlank: true,
        fieldLabel: 'Select Country',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_countries'
                        }
                    }
                },
                isLoad: true
            }
            
        }

    },{
        xtype: 'textfield',
        fieldLabel: 'Institution',
        margin: '0 20 20 0',
        name: 'institution'
    },{
        xtype: 'textfield',
        fieldLabel: 'Department(Optional)',
        margin: '0 20 20 0',
        name: 'department'
    },{
        xtype: 'combo',
        name: 'externaluser_category_id',
        allowBlank: true,
        fieldLabel: 'Select External Category',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_externaluser_categories'
                        }
                    }
                },
                isLoad: true
            }
        }
    }],
    dockedItems:[ {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[{
                    text: 'Save User',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    formBind: true,
                    ui: 'soft-purple',
                    storeID:'externalusersstr',
                    action_url: 'usermanagement/saveExternalUsersDetails',
                    handler: 'doCreateWorkflowParamWin'
                },{
                    text: 'Reset',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});