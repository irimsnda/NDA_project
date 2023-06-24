/**
 * Created by Kip on 5/9/2019.
 */
Ext.define('Admin.view.configurations.views.forms.SubmoduleRefFormatsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'submodulerefformatsfrm',
    autoScroll: true,
    controller: 'configurationsvctr',
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
        value: 'tra_submodule_referenceformats',
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
        fieldLabel: 'Module',
        margin: '0 20 20 0',
        name: 'module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
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
                subModuleStore.load({ params: { module_id: newVal } });
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
        allowBlank: true,
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
        fieldLabel: 'Section Name',
        margin: '0 20 20 0',
        name: 'section_id',
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
                        extraParams: {
                            model_name: 'Sections'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Reference Type',
        margin: '0 20 20 0',
        name: 'reference_type_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'referencenumbers_types'
                        }
                    }
                },
                isLoad: true
            },
            change: function(cmb,newVal){
                var form=cmb.up('form'),
                    refFormatsFld=form.down('combo[name=reference_format_id]'),
                    refFormatsStore=refFormatsFld.getStore(),
                    filterObj = {refnumbers_type_id: newVal},
                    filterStr = JSON.stringify(filterObj);
                refFormatsStore.removeAll();
                refFormatsStore.load({params: {filters: filterStr}});
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Reference Format',
        margin: '0 20 20 0',
        name: 'reference_format_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'refnumbers_formats'
                        }
                    }
                },
                isLoad: false
            }
        }
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_submodule_referenceformats',
                    storeID: 'submodulerefformatsstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
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