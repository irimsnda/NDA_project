/**
 * Created by Softclans on 9/16/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.AppDataMigrationRequestFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'appdatamigrationrequestfrm',
    autoScroll: true,
    controller: 'applicationdatmigrationvctr',
    layout: 'form',
    bodyPadding: 8,
    frame: true,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_datamigrationrequests',
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
        xtype: 'hiddenfield',
        name: 'module_id',
        allowBlank: false
    },  {
        xtype: 'textfield',
        fieldLabel: 'Data Request Name/Description',
        margin: '0 20 20 0',
        name: 'name'
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        margin: '0 20 20 0',
        name: 'sub_module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule'
                        }
                    }
                },
                isLoad: false
            },
            afterrender:function(cbo){
                var frm = cbo.up('form'),
                    store = cbo.getStore(),

                    module_id = frm.down('hiddenfield[name=module_id]').getValue();
                    store.removeAll();
                    store.load({ params: { module_id: module_id } });
            }
        
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Section',
        margin: '0 20 20 0',
        name: 'section_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'Section'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_datamigrationrequests',
                   // storeID: 'productappdatamigrationrequestgridstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'workflow/saveWorkflowCommonData',
                    handler: 'doSaveappdatamigrationrequest'
                }
            ]
        }
    ]
});