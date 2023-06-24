/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.PIRSampleDetailsTabPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'pirsampledetailstabpanel',
    itemId: 'pirsampledetailstabpanel',
    controller: 'surveillancevctr',viewModel: 'surveillancevm',
    margin: 1,
    height: 540,
    layout: 'card',
    flex: 1,
    scrollable: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [{
            xtype:'form',
            itemId:'pmsprogramplan',
            layout:'fit',
            items:[ {
                xtype: 'fieldset',
                title: 'PMS Plan',
                checkboxToggle: true,
                collapsible: true,
                region:'north',
                scrollable: true,
                style: 'background:white',
                layout: 'column',
                defaults: {
                    columnWidth: 0.33,
                    margin: 3,
                    labelAlign: 'top',
                    allowBlank: false
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'pms_plan_id'
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'column',
                        defaults: {
                            labelAlign: 'top'
                        },
                        fieldLabel: 'Product',
                        items: [
                           
                            {
                                xtype: 'combo',
                                readOnly: true,
                                forceSelection: true,
                                queryMode: 'local', 
                                valueField: 'product_id',
                                displayField: 'product_name',
                                name: 'product_id',
                                anyMatch: true,
                                columnWidth: 0.9,
                                listeners: {
                                    beforerender: {
                                        fn: 'setSurveillanceCombosStore',
                                        config: {
                                            pageSize: 1000,
                                            storeId:'programproductsstr',
                                            proxy: {
                                                url: 'surveillance/getPmsProgramProducts'
                                            }
                                        },
                                        isLoad: false
                                    }
                                }
                              
                            },
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-search',
                                columnWidth: 0.1,
                                tooltip: 'Search',
                                action: 'link_pms_plan',
                                childXtype: 'pmsplansselectiongrid',
                                winTitle: 'PMS Plan Selection List',
                                winWidth: '60%'
                            }
                        ]
                    }, {
                        xtype: 'combo',
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        name: 'sampling_site_id',
                        store: 'businesstypesstr',
                        allowBlank: false,
                        anyMatch: true,
                        readOnly: true,
                        hidden: true,
                        columnWidth: 0.9
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Product Category',
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'category_name',
                        name: 'product_category_id',
                        anyMatch: true,
                        //readOnly: true,
                        hidden:true,
                        listeners: {
                            beforerender: {
                                fn: 'setSurveillanceCombosStore',
                                config: {
                                    pageSize: 1000,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_product_categories'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                    },
                    
                    {
                        xtype: 'combo',
                        fieldLabel: 'Dosage Form',
                        forceSelection: true,
                        readOnly: true,
                        queryMode: 'local',
                        hidden: true,
                        allowBlank: true,
                        valueField: 'id',
                        displayField: 'name',
                        anyMatch: true,
                        store: 'dosageformstr',
                        name: 'dosage_form_id'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Product Form',
                        forceSelection: true,
                        readOnly: true,
                        queryMode: 'local',
                        valueField: 'id',
                        hidden: true,
                        allowBlank: true,
                        displayField: 'name',
                        anyMatch: true,
                        name: 'product_form_id',
                        listeners: {
                            beforerender: {
                                fn: 'setSurveillanceCombosStore',
                                config: {
                                    pageSize: 1000,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_product_forms'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Device Type',
                        forceSelection: true,
                        readOnly: true,
                        queryMode: 'local',
                        hidden: true,
                        allowBlank: true,
                        valueField: 'id',
                        displayField: 'name',
                        anyMatch: true,
                        name: 'device_type_id',
                        listeners: {
                            beforerender: {
                                fn: 'setSurveillanceCombosStore',
                                config: {
                                    pageSize: 1000,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_device_types'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'column',
                        fieldLabel: 'Strength',
                        items: [
                            {
                                xtype: 'numberfield',
                                columnWidth: 0.7,
                                readOnly: true,
                                name: 'strength',
                                minValue: 0
                            },
                            {
                                xtype: 'combo',
                                forceSelection: true,
                                queryMode: 'local',
                                valueField: 'id',
                                displayField: 'name',
                                readOnly: true,
                                store: 'siunitstr',
                                name: 'si_unit_id',
                                columnWidth: 0.3,
                                listeners: {
                                    beforerender: function () {
                                        var store = this.getStore();
                                        store.removeAll();
                                        store.load();
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Number of brand to be collected',
                        name: 'number_of_brand',
                        readOnly: true,
                        minValue: 0
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Number of batch per brand to be collected',
                        name: 'number_of_batch',
                        readOnly: true,
                        minValue: 0
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Unit Pack',
                        layout: 'column',
                        defaults: {
                            columnWidth: 0.33
                        },
                        items: [
                            {
                                xtype: 'combo',
                                forceSelection: true,
                                queryMode: 'local',
                                valueField: 'id',
                                displayField: 'name',
                                readOnly: true,
                                anyMatch: true,
                                name: 'container_id',
                                listeners: {
                                    beforerender: {
                                        fn: 'setSurveillanceCombosStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                url: 'commonparam/getCommonParamFromTable',
                                                extraParams: {
                                                    table_name: 'par_containers'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                }
                            },
                            {
                                xtype: 'numberfield',
                                name: 'unit_pack',
                                readOnly: true,
                                minValue: 0
                            },
                            {
                                xtype: 'combo',
                                forceSelection: true,
                                queryMode: 'local',
                                valueField: 'id',
                                displayField: 'name',
                                name: 'packaging_unit_id',
                                anyMatch: true,
                                readOnly: true,
                                store: 'packagingunitsstr'
                            }
                        ]
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Number of unit pack per batch to be collected',
                        name: 'number_of_unitpack',
                        readOnly: true,
                        minValue: 0
                    },
                   
                ]
            }]
      },
       {
            xtype:'tabpanel',
            title:'Sample Details',
            layout:'fit',
            items:[ {
                title: 'Sample Details',
                xtype: 'sampledetailsfrm',
                itemId: 'sampledetailsfrm'
            },
            {
                title: 'Ingredients',
                xtype: 'pmssampleingredientsgrid',
               // hidden: true,
                listeners:{
                    beforeactivate: function(){
                        var tabPnl=this.up('tabpanel'),
                            sample_id=tabPnl.down('hiddenfield[name=sample_id]').getValue();
                        if(!sample_id){
                            toastr.warning('Please save sample details first!!','Warning Response');
                            return false;
                        }
                    }
                }
            }]

       }
    ],initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-list',
                    pressed: true,
                    enableToggle: true,
                    text: 'PROGRAM PLAN IMPLEMENTATION SELECTION',
                    action: 'quickNav'
                },{
                    step: 1,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'SAMPLE/PRODUCT COLLECTION DETAILS',
                    action: 'quickNav'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Program Plan',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    name: 'prev_btn'
                },
               
                '->',
                {
                    text: 'Sample Collection Details',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    name: 'next_btn'
                }
            ]
        };
        me.callParent(arguments);
    }

});