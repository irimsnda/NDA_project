/**
 * Created by Kip on 1/21/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ImpProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'impproductsfrm',
    viewModel:'clinicaltrialvm',
    layout: 'column',
    defaults: {
        columnWidth: 0.25,
        margin: 3,
        labelAlign: 'top',
        allowBlank: false
    },
    bodyPadding: 5,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Product Type Category',
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            name: 'investigationproduct_section_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_investigationproduct_sections'
                            }
                        }
                    },
                    isLoad: true
                },change: function(cbo,value){
                        var form = cbo.up('form');
                        if(value == 5 || value == 6){
                            form.getViewModel().set('isMedicinesProduct', false);
                            section_id = 4;
                        }
                        else{
                            section_id = 2;
                            form.getViewModel().set('isMedicinesProduct', true);
                        }
                        //load stores 
                        filters = {section_id:section_id};
                        filters = JSON.stringify(filters);
                        Ext.getStore('ctrclassificationsStr').load({params:{filters:filters}});
                         Ext.getStore('ctrcommonnamesstr').load({params:{filters:filters}});
                        Ext.getStore('ctrdosageformstr').load({params:{filters:filters}});
                        Ext.getStore('ctradministrationroutesstr').load({params:{filters:filters}});
                        Ext.getStore('ctrsiunitstr').load({params:{filters:filters}});
                        
                }
                
            },
            bind:{
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Trade/Brand Name',
            name: 'brand_name',
            bind:{
                readOnly: '{isReadOnly}'
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Classification',
            name: 'classification_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'ctrclassificationsStr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_classifications'
                            }
                        }
                    },
                    isLoad: true
                }
            },
            bind:{
                hidden: '{!isMedicinesProduct}',
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Generic Name',
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            name: 'common_name_id',
            listeners:{
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        storeId: 'ctrcommonnamesstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_common_names'
                            }
                        }
                    },
                    isLoad: false
                },
            },
            bind:{
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Dosage Form',
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',allowBlank: true,
            name: 'dosage_form_id',
            listeners:{
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 1000,
                        storeId: 'ctrdosageformstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_dosage_forms'
                            }
                        }
                    },
                    isLoad: false
                },
            },
            
            bind: {
                hidden: '{!isMedicinesProduct}', 
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Routes of Admin',
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',allowBlank: true,
            name: 'routes_of_admin_id',
            listeners:{
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 1000,
                        storeId: 'ctradministrationroutesstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_route_of_administration'
                            }
                        }
                    },
                    isLoad: false
                }
            }, bind: {
                hidden: '{!isMedicinesProduct}', 
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            fieldLabel: 'Product Strength',
            defaults: {
                labelAlign: 'top',
                allowBlank: false
            }, bind: {
                hidden: '{!isMedicinesProduct}'
            },
            items: [
                {
                    xtype: 'textfield',
                    columnWidth: 0.6,allowBlank: true,
                    name: 'product_strength',
                    bind:{
                        readOnly: '{isReadOnly}',
                    }
                },
                {
                    xtype: 'combo',
                    columnWidth: 0.4,
                    forceSelection: true,
                    displayField: 'name',
                    valueField: 'id',
                    queryMode: 'local',allowBlank: true,
                    name: 'si_unit_id',
                    listeners:{
                        beforerender: {
                            fn: 'setClinicalTrialCombosStore',
                            config: {
                                pageSize: 1000,
                                storeId: 'ctrsiunitstr',
                                proxy: {
                                    url: 'configurations/getproductApplicationParameters',
                                    extraParams: {
                                        table_name: 'par_si_units'
                                    }
                                }
                            },
                            isLoad: false
                        },
                    },
                    bind:{
                        readOnly: '{isReadOnly}'
                    }
                }
            ]
        }, {
            xtype: 'combo',
            fieldLabel: 'Medical Devices Type',
            name: 'device_type_id',
            forceSelection: true,allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_device_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                hidden: '{isMedicinesProduct}',
                readOnly: '{isReadOnly}'
            }
        },{
            xtype: 'textfield',
            name: 'gmdn_code',allowBlank: true,
            fieldLabel: 'GMDN Code',
            allowBlank: true,
            readOnly: true, bind: {
                hidden: '{isMedicinesProduct}', 
                readOnly: '{isReadOnly}'
            }

        }, {
            xtype: 'textfield',
            fieldLabel: 'GMDN Term',allowBlank: true,
            name: 'gmdn_term', bind: {
                hidden: '{isMedicinesProduct}',
                readOnly: '{isReadOnly}'
            }
        },  {
            xtype: 'combo',
            fieldLabel: 'GMDN Category',
            name: 'gmdn_category',
            forceSelection: true,
            queryMode: 'local',allowBlank: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_gmdn_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                hidden: '{isMedicinesProduct}',
                readOnly: '{isReadOnly}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Identification Mark',allowBlank: true,
            name: 'identification_mark',
            bind:{
                readOnly: '{isReadOnly}'
            }
        },
        
        {
            xtype: 'combo',
            store: 'impsourcesstr',
            forceSelection: true,
            displayField: 'name',
            fieldLabel: 'IMP Source',
            valueField: 'id',
            queryMode: 'local',
            name: 'market_location_id',
            listeners: {
                beforerender: function () {
                    var store = this.getStore();
                    store.removeAll();
                    store.load();
                }
            },
            bind:{
                readOnly: '{isReadOnly}'
            }
        },
        
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Manufacturer',
            items: [
                {
                    xtype: 'combo',
                    name: 'manufacturer_id',
                    forceSelection: true,
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'manufacturer_id',
                    displayField: 'manufacturer_name',
                    columnWidth: 0.9,
                    listeners: {
                        beforerender: {
                            fn: 'setClinicalTrialCombosStore',
                            config: {
                                pageSize: 1000,
                                storeId: 'manufacturersConfigStr',
                                proxy: {
                                    url: 'productregistration/onLoadManufacturersDetails'
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-plus',
                    columnWidth: 0.1,
                    tooltip: 'add manufacturer',
                    childXtype: 'manufacturerConfigFrm',
                    stores: 'manufacturersConfigStr',
                    winTitle: 'Sample/Product Selection List',
                    winWidth: '70%',
                    handler: 'showAddConfigParamWinFrm'
                }
            ]
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Product Description(Summary of chemistry and manufacturing data,formulation,composition,excipients and strength)',
            columnWidth: 0.6,
            name: 'product_desc',
            allowBlank: true,
            bind:{
                readOnly: '{isReadOnly}'
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Registration No',
            
            name: 'registration_no',allowBlank: true,
            bind:{
                readOnly: '{isReadOnly}'
            }
        },
        
        {
            xtype: 'datefield',
            fieldLabel: 'Reg Date',
            name: 'registration_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            hidden: true,
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            bind:{
                readOnly: '{isReadOnly}'
            }
        }
    ]
});