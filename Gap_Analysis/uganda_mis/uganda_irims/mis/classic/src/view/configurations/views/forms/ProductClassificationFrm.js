/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.configurations.views.forms.ProductClassificationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productClassificationFrm',
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
        value: 'par_classifications',
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
        fieldLabel: 'Section Name',
        margin: '0 20 20 0',
        name: 'section_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
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
            },
            change : function(combo,newVal,oldValue,eopts) {
                var frm=this.up('form'),
                    filter={'section_id':newVal}
                    cost_categorystr=frm.down('combo[name=cost_category_id]').getStore();
                    cost_categorystr.removeAll();

                    cost_categorystr.load({params:{filters:JSON.stringify(filter)}});
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Product Class Category',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'prodclass_category_id',
        valueField: 'id',
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
                            table_name: 'par_prodclass_categories'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Cost Category',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'cost_category_id',
        valueField: 'id',
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
                            table_name: 'par_cost_categories'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'EAC Code',allowBlank: true,
        margin: '0 20 20 0',
        name: 'eacCode',
        valueField: 'eacCode',
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
                            table_name: 'eac_classification'
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
    },{
        xtype: 'checkbox',
        inputValue: 1,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
        allowBlank: true
    },
        {
            xtype: 'combo',
            fieldLabel: 'LIMS Classification',
            name: 'lims_classification_id',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'sampleanalysis/getSampleAnalyisParameter',
                            extraParams: {
                                table_name: 'classification'
                            }
                        }
                    },
                    isLoad: true
                }
            }
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
                    table_name: 'par_classifications',
                    storeID: 'productClassificationStr',
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