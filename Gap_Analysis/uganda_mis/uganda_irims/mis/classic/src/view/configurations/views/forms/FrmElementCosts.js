
/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.configurations.views.forms.FrmElementCosts', {
    extend: 'Ext.form.Panel',
    xtype: 'frmelementcosts',
    autoScroll: true,
    title: 'Element Cost',
        layout: 'column',
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            columnWidth: 0.5,
        },
        collapsible: true,
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Fee Type',
            forceSelection: true,
            allowBlank: false,
            margin:5,
            name: 'feetype_id',readOnly: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners:{
                 afterrender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_fee_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change:function(cbo,newvalue, oldValue, eopts){
                       var form = cbo.up('form'),
                           cost_category = form.down('combo[name=cost_category_id]').getStore(),
                           element_id = form.down('combo[name=element_id]').getStore();
       
                        var filter = {'fee_type_id':newvalue};
                           filter = JSON.stringify(filter);
                           cost_category.removeAll();
                           element_id.removeAll();
                           cost_category.load({params:{filters: filter}});
                           element_id.load({params:{filters: filter}});
                }
               
             }
        },{
            xtype: 'combobox',
            fieldLabel: 'Category',
            forceSelection: true,
            allowBlank: false,
            margin:5,readOnly: true,
            queryMode: 'local',
            displayField: 'name',
           valueField: 'id',
           name: 'cost_category_id',
           listeners:{

            afterrender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_cost_categories'
                            }
                        }
                    },
                    isLoad: false
                },
                change:function(cbo,newvalue, oldValue, eopts){
                       var form = cbo.up('form'),
                           cost_subcategory = form.down('combo[name=sub_cat_id]').getStore();
                        var filter = {'cost_category_id':newvalue};
                           filter = JSON.stringify(filter);
                           cost_subcategory.removeAll();
                           cost_subcategory.load({params:{filters: filter}});
                }
           }
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Sub Category',
            forceSelection: true,
            allowBlank: true,readOnly: true,
            margin:5,
            name: 'sub_cat_id',
            queryMode: 'local', 
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners:
             {
                 afterrender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_cost_sub_categories'
                            }
                        }
                    },
                    isLoad: false
                }
               
             },
              
        },{
            
            xtype: 'combobox',
            fieldLabel: 'Cost Element',
            forceSelection: true,
            allowBlank: false,
            margin:5,
            name: 'element_id',readOnly: true,
            queryMode: 'local',
            displayField: 'name',
          
            valueField: 'id',
            listeners:
             {
                 afterrender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_cost_elements'
                            }
                        }
                    },
                    isLoad: false
                }
             },
         },{
            xtype: 'combobox',
            forceSelection: true,
            name: 'formula',
            displayField: 'name',
            allowBlank: true,
            fieldLabel: 'Is Formula',
            margin: '0 20 0 0',
            valueField: 'id',
            queryMode: 'local',readOnly: true,
            listeners:{
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config:{
                        pageSize: 10000,
                        proxy:{
                            url: 'configurations/getConfigParamFromTable',
                            extraParams:{
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                },
                change:function(cbo,newvalue, oldValue, eopts){
                    var frm = cbo.up('form'),
                    formula_rate  = frm.down('numberfield[name=formula_rate]'),
                    fieldcontainer  = frm.down('fieldcontainer[name=costsdefinations]')
                        if(newvalue == 1){
                            formula_rate.setHidden(false);
                            fieldcontainer.setHidden(true);
                        }else{
                            formula_rate.setHidden(true);
                            fieldcontainer.setHidden(false);
                        }
                }
            }
        },{
            xtype: 'fieldcontainer',
            name: 'costsdefinations',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Costs',readOnly: true,
                allowBlank: true,
                value: 0,
                columnWidth: 0.49,
                name: 'cost'
            },{
                xtype: 'combobox',
                forceSelection: true,
                name: 'currency_id',
                displayField: 'name',
                allowBlank: true,
                fieldLabel: 'Currency',
                valueField: 'id',
                columnWidth: 0.49,readOnly: true,
                queryMode: 'local',
                listeners:{
                    afterrender: {
                        fn: 'setConfigCombosStore',
                        config:{
                            pageSize: 10000,
                            proxy:{
                                url: 'configurations/getConfigParamFromTable',
                                extraParams:{
                                    table_name: 'par_currencies',
                                    is_paying_currency: 1
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }]
        },{
            xtype: 'numberfield',
            fieldLabel: 'ForMula Rate(% or counter)',
            allowBlank: true,readOnly: true,
            value: 0,margin:5,
            hidden: true,
            name: 'formula_rate'
        }]
});