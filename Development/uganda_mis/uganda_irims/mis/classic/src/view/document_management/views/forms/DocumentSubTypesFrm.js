/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.forms.DocumentSubTypesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'documentsubtypesfrm',
    controller: 'documentsManagementvctr',
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
        value: 'par_document_subtypes',
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
        xtype: 'combo',
            fieldLabel: 'Master SOP',
            margin: '0 20 20 0',
            name: 'sop_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'documentmanagement/getSOPMasterListDetails'
                         }
                    },
                    isLoad: true
                },
                change:function(cbo,value){
                        var form = cbo.up('form'),
                            document_type = form.down('combo[name=document_type_id]'),
                            store = document_type.getStore();
                            store.load({
                                params:{
                                    sop_id: value
                                }
                            })
                }
            }
    },{
        xtype: 'combo',
            fieldLabel: 'Document Type',
            margin: '0 20 20 0',
            name: 'document_type_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'documentmanagement/getDocumentsTypes'
                         }
                    },
                    isLoad: false
                }
                
            }
    },{
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name'
    },{
        xtype: 'textfield',
        fieldLabel: 'Document No',
        margin: '0 20 20 0',
        name: 'document_no'
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
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
                    table_name: 'par_document_subtypes',
                    storeID: 'documentsubtypesstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
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