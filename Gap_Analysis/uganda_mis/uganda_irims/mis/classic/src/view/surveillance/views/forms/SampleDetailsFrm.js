/**
 * Created by Kip on 3/8/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.SampleDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'sampledetailsfrm',
    controller: 'surveillancevctr',
    scrollable: true,
    height: 550,
    //frame: true,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.down('button[action=search_sample]').setDisabled(true);
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'sample_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sample_appcode'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Sample Name',
            items: [
                {
                    xtype: 'textfield',
                    name: 'sample_name',
                    columnWidth: 0.9
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search Sample',
                    action: 'search_sample',
                    childXtype: 'sampleselectiongrid',
                    winTitle: 'Sample/Product Selection List',
                    winWidth: '90%'
                }
            ]
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Registration No',
            name: 'certificate_no'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Sample Code',
            name: 'sample_code'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Dosage Form',
            name: 'dosage_form_id',
            forceSelection: true,
            hidden: true,
            queryMode: 'local',
            allowBlank: true,
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'sampleanalysis/getSampleAnalyisParameter',
                            extraParams: {
                                table_name: 'dosageform',
                                has_filter: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Product Form',
            name: 'product_form_id',
            hidden: true,
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'sampleanalysis/getSampleAnalyisParameter',
                            extraParams: {
                                table_name: 'productform',
                                has_filter: 1
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
            name: 'device_type_id',
            hidden: true,
            allowBlank: true,
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'sampleanalysis/getSampleAnalyisParameter',
                            extraParams: {
                                table_name: 'medicaldevices_types',
                                has_filter: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            name: 'common_name',
            hidden: true,
            allowBlank: true,
            fieldLabel: 'Common Name'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Collection Date',
            name: 'date_collected',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Classification',
            name: 'classification_id',
            //store: 'classificationstr',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStoreWithSectionFilter',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'sampleanalysis/getSampleAnalyisParameter',
                            extraParams: {
                                table_name: 'classification',
                                has_filter: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Packaging Size',
            name: 'packaging_size'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Packaging Units',
            name: 'packaging_units_id',
            //store: 'packagingunitsstr',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStoreWithSectionFilter',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'sampleanalysis/getSampleAnalyisParameter',
                            extraParams: {
                                table_name: 'packaging_units',
                                has_filter: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'No of Collected Samples',
            name: 'collected_samples'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Batch No',
            name: 'batch_no'
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
                            fn: 'setSurveillanceCombosStore',
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
            xtype: 'datefield',
            fieldLabel: 'Manufacturer Date',
            name: 'manufacturing_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Expiry Date',
            name: 'expiry_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Product Storage',
            name: 'storage_condition_id',
            store: 'storageconditionstr',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Collection Site Storage Condition',
            name: 'collectionsite_storage_condition'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Seal Pack Condition',
            name: 'seal_condition_id',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            allowBlank: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable'
                        }
                    },
                    isLoad: false
                },
                afterrender: function () {
                    var form = this.up('form'),
                        section_id = form.down('hiddenfield[name=section_id]').getValue(),
                        store = this.getStore(),
                       
                    filters = JSON.stringify(filters);
                    store.removeAll();
                    store.load({params: {table_name: 'par_seal_types'}});
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Shelf Life',
            name: 'shelf_life'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Shelf life after opening',
            name: 'shelf_lifeafter_opening'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Remarks',
            name: 'remarks'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Reason for Sampling',
            name: 'sampling_reason_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_samplingreasons'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Sample Collector',
            name: 'sample_collector_id',
            store: 'usersstr',
            forceSelection: true,
            queryMode: 'local',
           // anyMatch: true,
            valueField: 'id',
            displayField: 'fullnames',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Sample Application Type',
            name: 'sample_application_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            anyMatch: true,
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_sample_application_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textarea',
            emptyText: '(Brief physical/visual description of sample)',
            columnWidth: 0.5,
            fieldLabel: 'Product Description',
            name: 'product_description'
        }
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            action: 'save_form_data',
            name: 'save_btn',
            storeID: 'sampledetailsstr'
        }
    ]
});