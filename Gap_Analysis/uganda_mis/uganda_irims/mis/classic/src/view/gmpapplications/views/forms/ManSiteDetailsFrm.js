/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ManSiteDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'mansitedetailsfrm',
    scrollable: true,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
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
            name: 'man_site_id'//par
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'//tra
        },
        {
            xtype: 'hiddenfield',
            name: 'registered_manufacturing_site_id'//registered
        },
        {
            xtype: 'fieldset',
            title: 'Manufacturer Details',
            style: 'background:white',
            collapsible: false,
            hidden: true,
            layout: {
                type: 'column'
            },
            bodyPadding: 5,
            defaults: {
                columnWidth: 0.33,
                margin: 5,
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'manufacturer_name',
                            columnWidth: 0.9,
                            allowBlank: true,
                            fieldLabel: 'Manufacturer (Corporate) Name'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            name: 'search_site',
                            childXtype: 'mansitesselectiongrid',
                            winTitle: 'Manufacturing Sites Selection List',
                            winWidth: '90%',
                            margin: '30 0 0 0',
                            stores: '[]'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'manufacturer_email_address',
                    fieldLabel: 'Manufacturer Email'
                },
                {
                    xtype: 'textfield',
                    name: 'manufacturer_physical_address',
                    fieldLabel: 'Corporate Address'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'manufacturer_country_id',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/country'
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmbo, newVal) {
                            var form = cmbo.up('form'),
                                regionStore = form.down('combo[name=region_id]').getStore(),
                                filterObj = {country_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                            regionStore.removeAll();
                            regionStore.load({params: {filter: filterStr}});
                        }
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Manufacturing Site Details',
            style: 'background:white',
            collapsible: false,
            layout: {
                type: 'column'
            },
            bodyPadding: 5,
            defaults: {
                columnWidth: 0.33,
                margin: 5,
                labelAlign: 'top'
            },
            items:[
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'name',
                            columnWidth: 0.9,
                            allowBlank: false,
                            fieldLabel: 'Manufacturing Site Name'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            //disabled: true,
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            action: 'search_site',
                            childXtype: 'manufacturingsitesselectiongrid',
                            winTitle: 'Manufacturing Sites Selection List',
                            winWidth: '90%',
                            margin: '30 0 0 0'
                        }
                    ]
                }, {
                    xtype: 'textfield',
                    name: 'premise_reg_no',
                    fieldLabel: 'Registration No',
                    hidden: true,
                    allowBlank: true,
                    disabled: true
                },
                {
                    xtype: 'textfield',
                    name: 'permit_no',
                    fieldLabel: 'Permit No',
                    allowBlank: true,
                    hidden: true,
                    disabled: true
                },
                {
                    xtype: 'textfield',
                    name: 'gmp_cert_no',
                    fieldLabel: 'GMP Certificate No',
                    hidden: true,
                    allowBlank: true,
                    disabled: true
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'country_id',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/country'
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmbo, newVal) {
                            var form = cmbo.up('form'),
                                regionStore = form.down('combo[name=region_id]').getStore(),
                                filterObj = {country_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                            regionStore.removeAll();
                            regionStore.load({params: {filter: filterStr}});
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Region',
                    name: 'region_id',
                    //store: 'regionsstr',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/region'
                                }
                            },
                            isLoad: false
                        },
                        change: function (cmbo, newVal) {
                            var form = cmbo.up('form'),
                                districtStore = form.down('combo[name=district_id]').getStore(),
                                filterObj = {region_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                            districtStore.removeAll();
                            districtStore.load({params: {filter: filterStr}});
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'District',
                    name: 'district_id',
                    //store: 'districtsstr',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/district'
                                }
                            },
                            isLoad: false
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Street',
                    name: 'street',  hidden: true,
                    allowBlank: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Telephone',
                    name: 'telephone'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fax',
                    name: 'fax',  hidden: true,
                    allowBlank: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email Address',
                    name: 'email'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Website',
                    name: 'website',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Physical Address',
                    name: 'physical_address'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Postal Address',
                    name: 'postal_address'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Business Scale',
                    name: 'business_scale_id',
                    store: 'businessscalesstr',
                    valueField: 'id',
                    displayField: 'name',
                    hidden: true,
                    queryMode: 'local',
                    forceSelection: true,
                    listeners: {
                        afterrender: function () {
                            var store = this.getStore();
                            store.removeAll();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Business Category',
                    name: 'business_category_id',
                    store: 'businesscategoriesstr',
                    valueField: 'id', hidden: true,
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: true,
                    forceSelection: true,
                    listeners: {
                        afterrender: function () {
                            var store = this.getStore();
                            store.removeAll();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Business Type',
                    name: 'business_type_id',
                    store: 'businesstypesstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosStoreWithSectionFilter',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_business_types'
                                    }
                                }
                            },
                            isLoad: false
                        },
                        afterrender:function(cbo){
                            var store = cbo.getStore();
                            var filters = {is_manufacturer:1},
                                filters = JSON.stringify(filters);
                                store.removeAll();
                                store.load({params:{filters:filters} });
                        }
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: "SME's Option Selection(Optional)",
                    
                    name: 'smes_option_id',
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
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_gmpsmes_options'
                                    }
                                }
                            },
                            isLoad: true
                        }
                       
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Longitude',
                    name: 'longitude',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Latitude',
                    name: 'latitude',
                    allowBlank: true
                }
            ]
        }
    ]
});