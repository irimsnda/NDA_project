/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.forms.SectionModulesDocTypeDefinationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'sectionModulesDocTypeDefinationFrm',
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
        value: 'tra_sectionssubmodule_docdefination',
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
        margin: '0 20 20 0',
        name: 'doc_section_id',
        allowBlank: true
    },  {
        xtype: 'combo',
        fieldLabel: 'Module Node Name',
        margin: '0 20 20 0',
        name: 'module_id',
        valueField: 'module_id',
        displayField: 'module_name',
        queryMode: 'local',
        listeners: {
            beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'documentmanagement/getDMSSectionsModulesDefinationDetails'
                        }
                    },
                    isLoad: false
            },
            afterrender: function (cmbo) {
                    form = cmbo.up('form'),
                    doc_section_id = form.down('hiddenfield[name=doc_section_id]').getValue();
                    cmbo.store.load({params:{doc_section_id:doc_section_id} })
            },
            change: function (cmbo, newVal) {
                var form = cmbo.up('form'),
                    subModuleStore = form.down('combo[name=sub_module_id]').getStore();
                    subModuleStore.removeAll();
                    subModuleStore.load({params: {doc_module_id: newVal}});

            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub-Module Name',
        margin: '0 20 20 0',
        name: 'sub_module_id',
        valueField: 'sub_module_id',
        displayField: 'submodule_name',
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'documentmanagement/getDMSSectionsSubModulesDefinationDetails'
                    }
                },
                isLoad: false
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Document Types',
        margin: '0 20 20 0',
        name: 'document_type_id',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'documentmanagement/getDocumentsTypes'
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
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_sectionssubmodule_docdefination',
                storeID: 'dmsdocumentTypedefinationstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'documentmanagement/saveDMSModulesDocTypeDefinationDetails',
                handler: 'doCreateDMSSectionDocConfigParamWin'
            }, {
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