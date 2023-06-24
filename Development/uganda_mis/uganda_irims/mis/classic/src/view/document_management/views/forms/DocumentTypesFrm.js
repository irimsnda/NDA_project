/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.forms.DocumentTypesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'documenttypesfrm',
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
        value: 'par_document_types',
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
    },{
        xtype: 'textfield',
        fieldLabel: 'Validity Period(Optional)',
        margin: '0 20 20 0',
        allowBlank: true,
        name: 'validity_period'
    },{
         xtype: 'combo',
            fieldLabel: 'Validity Period Defination',
            margin: '0 20 20 0',
            name: 'validity_perioddef_id',
            valueField: 'id',
            displayField: 'name', 
            allowBlank: true,
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_timespan_defination'
                            }
                        },
                    },
                    isLoad: true
                },
            }
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 2,
        fieldLabel: 'Is System Generated',
        margin: '0 20 20 0',
        name: 'is_system_generatedrpt',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 2,
        fieldLabel: 'Is Assessment Document',
        margin: '0 20 20 0',
        name: 'is_assessment_doc',
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
                    table_name: 'par_document_types',
                    storeID: 'documenttypesstr',
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