/**
 * Created by Kip on 5/31/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.CommonSampleDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'commonsampledetailsfrm',
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'zone_id'
    }, {
        xtype: 'hiddenfield',
        name: 'limssample_id'
    }, {
        xtype: 'combo',
        fieldLabel: 'Lab Station',
        emptyText: 'Laboratory Station',
        name: 'laboratory_id',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_laboratory_stations',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        fieldLabel: 'Sample Name',
        items: [
            {
                xtype: 'textfield',
                name: 'brand_name',
                allowBlank: false,
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
    }, {
        xtype: 'combo',
        fieldLabel: 'Sample Category',
        emptyText: 'Sample Category',
        name: 'sample_category_id',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sample_categories',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Dosage Form',
        name: 'dosage_form_id',
        forceSelection: true,
        hidden: true,
        allowBlank: true,
        queryMode: 'local',
        anyMatch: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_dosage_forms',
                            has_filter: 1
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
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
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_product_forms',
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
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_device_types',
                                has_filter: 0
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
        xtype: 'textfield',
        fieldLabel: 'Batch No',
        name: 'batchno'
    }, {
        xtype: 'combo',
        fieldLabel: 'Test Purpose',
        emptyText: 'Test Purpose',
        name: 'sample_purpose',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sample_purposes',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Classification',
        name: 'classification_id',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_classifications',
                            has_filter: 1
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        fieldLabel: 'Submission Date',
        xtype: 'datefield',
        name: 'submission_date',
        maxValue: new Date(),
        readOnly: true,
        value: new Date(),
        submitFormat: 'Y-m-d',
        format: 'd/m/Y',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
    }, {
        fieldLabel: 'Manufacturer Date',
        xtype: 'datefield',
        name: 'manufacturedate',
        maxValue: new Date(),
        submitFormat: 'Y-m-d',
        format: 'd/m/Y',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'

    }, {
        fieldLabel: 'Expiry Date',
        xtype: 'datefield',
        name: 'expirydate',
        submitFormat: 'Y-m-d',
        format: 'd/m/Y',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        fieldLabel: 'Quantity & Units',
        defaults: {
            labelAlign: 'top',
            allowBlank: false
        },
        items: [{
            xtype: 'textfield',
            columnWidth: 0.6,
            emptyText: 'Quantity',
            name: 'quantity',
            allowBlank: false
        }, {
            xtype: 'combo',
            emptyText: 'Quantity Units',
            name: 'quantity_unit_id',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            columnWidth: 0.4,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_packaging_units',
                                has_filter: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }]
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        fieldLabel: 'Packaging Size',
        defaults: {
            labelAlign: 'top',
            allowBlank: false
        },
        items: [{
            emptyText: 'Packaging Size',
            xtype: 'textfield',
            columnWidth: 0.6,
            name: 'pack_size',
            allowBlank: false
        },{
            xtype: 'combo',
            name: 'pack_unit_id',
            emptyText: 'Packaging Size Units',
            forceSelection: true,
            columnWidth: 0.4,
            queryMode: 'local',
            anyMatch: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_packaging_units',
                                has_filter: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }]
    }, {
        fieldLabel: 'Reasons for analysis',
        xtype: 'combo',
        queryMode: 'local',
        emptyText: 'Reasons for analysis',
        valueField: 'id',
        allowBlank: false,
        name: 'reason_for_analysis',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_analysis_reasons',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }

        }
    }]
});