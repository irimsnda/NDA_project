/**
 * Created by TMDA ICT team
 * User ICT tema
 * on 18/05/2021.
 */
 Ext.define('Admin.view.productrecallalert.views.forms.ProductRecallAlertFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productRecallAlertFrm',
    itemId: 'ProductRecallAlertFrm',
    layout: {
        type: 'column'
    },
  
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false,
       
    }, autoScroll: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'product_id'
        }, 
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            margin: 5,
            fieldLabel: 'Brand Name',
            readOnly: false,
            items: [{
                xtype: 'textfield',
                name: 'brand_name',
                readOnly: true,
                labelAlign: 'top',
                allowBlank: false,
                width: '80%'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                childXtype: 'allproductsrecalldetailsgrid',
                winTitle: 'All Products Details',
                winWidth: '70%',
                handlerFn: 'loadSelectedRecallProduct',
                handler: 'showAllProductsDetailsSearch'
            }]
        },
        {
            xtype: 'hiddenfield',
            name: 'tra_poe_permitsdata_id'
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            margin: 5,
            fieldLabel: 'Batch Number',
            readOnly: false,
            items: [{
                xtype: 'textfield',
                name: 'batch_number',
                readOnly: false,
                labelAlign: 'top',
                allowBlank: false,
                width: '80%'
            }, {
                xtype: 'button',
                name: 'batch_search_btn',
                iconCls: 'x-fa fa-link',
                childXtype: 'allproductrecallbatchessgrid',
                winTitle: 'Get Imported Batches for a Product',
                winWidth: '70%',
                handlerFn: 'loadSelectedRecallProductBatch',
                handler: 'showAllImportedBatchesForAProductSearch'
            }]
        },
       {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            forceSelection: true,
            
            queryMode: 'local',
            valueField: 'id',
            width: '80%',
            
            allowBlank: false,
            labelAlign: 'top',
            displayField: 'name', 
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosThscpfilterStore',
                    config: {
                        
                        storeId: 'par_thscpregionsstr',
                        proxy: {
                            url: 'api/thscp/getThscpParameters',
                            extraParams: {
                                table_name: 'par_thscp_hfr_regions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'textarea',
            name:'affected_Community',
            fieldLabel:'Affected community',            
            allowBlank: false, 
        },{
            xtype:'textarea',
            name:'action_Required',
            fieldLabel:'Action required',
            allowBlank: false,
            readOnly: false
        },
        {
            xtype:'textarea',
            name:'issue',
            fieldLabel:'Route Cause for recall',
            allowBlank: false,
            readOnly: false
        },{
            xtype: 'combo',
            fieldLabel: 'Recalling Organisation',
            name: 'recall_organisation_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosThscpfilterStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'api/thscp/getThscpParameters',
                            extraParams: {
                                table_name: 'par_thscp_rmis_source_type'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype:'numberfield',
            name:'distributed_quantity',
            fieldLabel:'Distributed quantity',
            allowBlank: false,
            readOnly: false
        },{
            xtype:'numberfield',
            name:'recalled_quantity',
            fieldLabel:'Recalled quantity',
            allowBlank: false,
            readOnly: false
        },{
            xtype:'numberfield',
            name:'received_quantity',
            fieldLabel:'Received quantity',
            allowBlank: false,
            readOnly: false
        },{
            xtype: 'combo',
            fieldLabel: 'SI Unit',
            name: 'packaging_unit_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: false,
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_packaging_units',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype:'numberfield',
            name:'recall_frequency',
            fieldLabel:'Recall frequency',
            allowBlank: false,
            readOnly: false
        },{
            xtype:'datefield',
            name: 'recall_date',
            fieldLabel:'Date of recall', // a day where the decision of recall was reached
            format: 'Y-m-d',
            maxValue: new Date()
       },{
        xtype:'datefield',
        name: 'start_date',
        fieldLabel:'Start date of the recall exercise', 
        format: 'Y-m-d',
        maxValue: new Date()
        },{
            xtype:'datefield',
            name: 'closure_date',
            fieldLabel:'Date of closing the recall exercise', 
            format: 'Y-m-d',
            maxValue: new Date()
        },
    ],

    initComponent: function () {
        var me = this;
        
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [                
                '->',
                {
                    text: 'Send Product Recall Alert',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    action_url: 'saveSendProductRecallAlertDetails',
                    wizard: 'newdrugproductreceivingwizard',
                    handler: 'saveSendProductRecallAlertDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});