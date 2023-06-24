/**
 * Created by Kip on 3/5/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.PmsProgramPlansFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pmsprogramplansfrm',
    controller: 'surveillancevctr',
    layout: 'column',
    frame: true,
    scrollable: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        labelAlign: 'top',
        margin: 3,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'program_id'
        }, {
            xtype: 'hiddenfield',
            name: 'program_implementation_id'
        },

        
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'pms_program_plans'
        },
        
        {
            xtype: 'combo',
            fieldLabel: 'Site Level',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'site_level_id',
            displayField: 'site_level',
            name: 'site_level_id',
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'surveillance/getPmsProgramSamplingSitesLevels'
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var store = this.getStore(),
                        form = this.up('form'),
                        program_id = form.down('hiddenfield[name=program_id]').getValue();
                        store.removeAll();
                        store.load({params: {program_id: program_id}});
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                      program_id = form.down('hiddenfield[name=program_id]').getValue();
                        samplingSitrstr = form.down('combo[name=sampling_site_id]').getStore(),
                        filterObj = {site_level_id: newVal,program_id:program_id},
                        filterStr = JSON.stringify(filterObj);
                        samplingSitrstr.removeAll();
                        samplingSitrstr.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Sampling Site',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'sampling_site',
            name: 'sampling_site_id',
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'surveillance/getPmsProgramSamplingSites'
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var store = this.getStore(),
                        form = this.up('form'),
                        program_id = form.down('hiddenfield[name=program_id]').getValue();
                        store.removeAll();
                        store.load({params: {program_id: program_id}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Product Category',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'product_category_id',
            anyMatch: true,
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
            fieldLabel: 'Product',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'product_id',
            displayField: 'product_name',
            name: 'product_id',
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'surveillance/getPmsProgramProducts'
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var store = this.getStore(),
                        form = this.up('form'),
                        program_id = form.down('hiddenfield[name=program_id]').getValue();
                    store.removeAll();
                    store.load({params: {program_id: program_id}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Dosage Form',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            anyMatch: true,
            store: 'dosageformstr',
            hidden: true,
            allowBlank: true,
            name: 'dosage_form_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Product Form',
            forceSelection: true,
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
                    xtype: 'textfield',
                    columnWidth: 0.7,
                    name: 'strength',
                    minValue: 0
                },
                {
                    xtype: 'combo',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    allowBlank: true,
                    displayField: 'name',
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
            minValue: 0
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Number of batch per brand to be collected',
            name: 'number_of_batch',
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
                    store: 'packagingunitsstr'
                }
            ]
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Number of unit pack per batch to be collected',
            name: 'number_of_unitpack',
            minValue: 0
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            forceSelection: true,
            queryMode: 'local',
            name: 'region_id',
            valueField: 'region_id',
            displayField: 'region_name',
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'surveillance/getPmsProgramRegions'
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var store = this.getStore(),
                        form = this.up('form'),
                        program_id = form.down('hiddenfield[name=program_id]').getValue();
                    store.removeAll();
                    store.load({params: {program_id: program_id}});
                },
                change: function (cmb, newVal) {
                    var form = cmb.up('form'),
                        districtStr = form.down('tagfield[name=district_ids]').getStore(),
                        filter = {
                            region_id: newVal
                        };
                    filter = JSON.stringify(filter);
                    districtStr.removeAll();
                    districtStr.load({params: {filter: filter}});
                }
            }
        },
        
        {
            xtype: 'tagfield',
            fieldLabel: 'District',
            margin: '0 20 20 0',
            store: 'districtsstr',
            name: 'district_ids',
            allowBlank: false,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',listeners: {
                beforerender: function () {
                    var store = this.getStore();
                    store.removeAll();
                    store.load();
                }
            }
            
        }
    ],
    buttons: [
        {
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            handler: 'doCreateSurveillanceParamWin',
            action_url: 'surveillance/saveSurveillancePlansDetailsCommonData',
            table_name: 'pms_program_plans',
            storeID: 'pmsprogramplansstr'
        }
    ]
});