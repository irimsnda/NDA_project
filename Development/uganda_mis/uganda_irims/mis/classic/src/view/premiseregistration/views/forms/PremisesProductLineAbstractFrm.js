/**
 * Created by Softclans on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.PremisesProductLineAbstractFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisesproductlineabstractfrm',
    controller: 'premiseregistrationvctr',
    frame: true,bodyPadding: 5,
    layout: {
        type: 'column'
    },
    
    defaults: {
        margin: 5,
        allowBlank: false,
        columnWidth: 1,
        labelAlign: 'top'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'premises_productline_details'
        },
        {
            xtype: 'hiddenfield',
            name: 'premise_id'
        },
        {
            xtype:'fieldcontainer',
            layout: {
                type: 'column'
            },
            
          
            items:[{
                xtype: 'combo',
                fieldLabel: 'Product Line Category',
                name: 'category_id',
                forceSelection: true,
                labelAlign:'top',
                columnWidth: 0.9,
                allowBlank: true, 
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            storeId:'setConfigCombosStoreWithSectionFilter',
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'gmp_product_categories'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function (cmb, newVal) {
                        var form = cmb.up('form'),
                            productLineStr = form.down('combo[name=product_line_id]').getStore(),
                            filters = {gmp_product_categories_id: newVal},
                            filter = JSON.stringify(filters);
                            productLineStr.removeAll();
                        productLineStr.load({params: {filters: filter}});
                    }
                }
            }, {
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                handler:'funcAddPremisesApplicationParamter',
                section_id: 2,
                childXtype:'premisesprodlinecategoriesfrm',
                width: '15%', margin:'28 0 0',
                table_name: 'gmp_product_categories',
                storeId: 'gmpproductlinecategoriesstr'
            }]

     }, {
        xtype:'fieldcontainer',
        layout: {
            type: 'column'
        },
        
        items:[{
            xtype: 'combo',
            fieldLabel: 'Product Line Line',
            name: 'product_line_id',
            forceSelection: true,labelAlign:'top',
            columnWidth: 0.9,
            queryMode: 'local', allowBlank: true, 
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStoreWithSectionFilter',
                    config: {
                        pageSize: 10000,
                        storeId:'gmpproductlinesstr',
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'gmp_product_lines'
                            }
                        }
                    },
                    isLoad: true
                },
            }
        },{
            xtype: 'button',
            iconCls:'x-fa fa-plus',
            handler:'funcAddPremisesApplicationParamter',
            section_id: 2,
            childXtype:'premisesprodlinedetailfrm',
            width: '15%', margin:'28 0 0',
            table_name: 'gmp_product_lines',
            storeId: 'gmpproductlinesstr'
        }]

}, 
        {
            xtype: 'textarea',
            fieldLabel: 'Product Line Description',
            allowBlank: false,
            name: 'prodline_description',
          
        },{
            xtype: 'combo',
            fieldLabel: 'Inspection Recommendation',
            name: 'prodline_inspectionstatus_id',
            store: 'gmpproductlinestatusstr',
            forceSelection: true,
            allowBlank: true,
            hidden: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'premises_productline_details',
            storeID: 'productlinedetailsstr',
            action_url: 'premiseregistration/saveGmpInspectionLineDetails',
            handler: 'doCreateGmpApplicationParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]

});