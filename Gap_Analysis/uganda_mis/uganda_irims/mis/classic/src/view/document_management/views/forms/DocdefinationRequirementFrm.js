/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.forms.DocdefinationRequirementFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'docdefinationrequirementfrm',
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
        value: 'tra_documentupload_requirements',
        allowBlank: true
    },{
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
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name'
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
                        extraParams: {
                            model_name: 'DocumentType'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Module',
        margin: '0 20 20 0',
        name: 'module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'Module'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var form = cmbo.up('form'),
                    subModuleStore = form.down('combo[name=sub_module_id]').getStore();
					subModuleStore.removeAll();
                    subModuleStore.load({params: {module_id: newVal}});
                    
                if(newVal == 1){
                    form.down('combo[name=prodclass_category_id]').setVisible(true);
                    
                    form.down('combo[name=business_type_id]').setVisible(false);
                }else if(newVal ==2){
                    
                    form.down('combo[name=business_type_id]').setVisible(true);
                    form.down('combo[name=prodclass_category_id]').setVisible(false);
                }
                else{
                    form.down('combo[name=prodclass_category_id]').setVisible(false);
                    form.down('combo[name=business_type_id]').setVisible(false);
                }
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        margin: '0 20 20 0',
        name: 'sub_module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
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
            },change: function (cmbo, newVal) {
                var form = cmbo.up('form'),
                     prodclassStr = form.down('combo[name=prodclass_category_id]').getStore(),
                     premisesTypesStr =  form.down('combo[name=business_type_id]').getStore(),
                     filter = {section_id: newVal},
                     filter = JSON.stringify(filter);
                     prodclassStr.removeAll();
                     prodclassStr.load({params: {filters: filter}});
           
                     premisesTypesStr.removeAll();
                     premisesTypesStr.load({params: {filters: filter}});
           
                     
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Product Class Categories',
        margin: '0 20 20 0',
        name: 'prodclass_category_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_prodclass_categories'
                        }
                    }
                   },
              isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Premises type(Premises Application)',
        margin: '0 20 20 0',
        name: 'business_type_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_business_types'
                        }
                    }
                   },
              isLoad: true
            }
        }
    },{
		xtype: 'checkbox',
		fieldLabel: 'Is Mandatory',
		name: 'is_mandatory',
		inputValue: 1,
		uncheckedValue: 0
	},{
        xtype: 'checkbox',
        fieldLabel: 'Portal Uploadable',
        name: 'portal_uploadable',
        inputValue: 1,
        uncheckedValue: 0,
        align: 'center'
    },{
        xtype: 'tagfield',
        fieldLabel: 'Allowed Document Extensions',
        margin: '0 20 20 0',
        name: 'document_extension_ids',
        allowBlank: false,
        forceSelection: true,
        filterPickList: true,
        encodeSubmitValue: true,
        emptyText: 'Select Document Extensions',
        growMax: 100,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'extension',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_document_extensionstypes'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        name: 'has_document_template',
        store: 'confirmationstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        fieldLabel: 'Has Document Template?',
        value: 2,
        listeners: {
            change: function (cmb, newVal) {
                var form = cmb.up('form'),
                document_template = form.down('filefield[name=document_template]');
                if (newVal == 1 || newVal === 1) {
                    document_template.allowBlank = false;
                    document_template.validate();
                    document_template.setVisible(true);
                } else {
                    document_template.allowBlank = true;
                    document_template.validate();
                    document_template.setVisible(false);
                }
            }
        }
    },{
        xtype: 'filefield',
        fieldLabel: 'Document Template',
        allowBlank: true,
        hidden: true,
        name: 'document_template'
    },{
		xtype: 'textarea',
		fieldLabel: 'Description',
		name: 'description',
        allowBlank: true
		
	}],
    dockedItems:[{
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_documentupload_requirements',
                    storeID: 'docdefinationrequirementstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveDocDefinationrequirement',
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