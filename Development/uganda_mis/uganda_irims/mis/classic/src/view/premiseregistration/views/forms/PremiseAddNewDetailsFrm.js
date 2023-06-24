/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PremiseAddNewDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseaddnewdetailsfrm',
    
    controller: 'premiseregistrationvctr',
    scrollable: true,
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
    
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'is_local',
            value: 1
        },{
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'textfield',
            name: 'name',
            columnWidth: 0.9,
            allowBlank: false,
            fieldLabel: 'Name'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Premise Type',
            name: 'premise_type_id',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premise_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        vehicleRegNo = form.down('textfield[name=vehicle_reg_no]');
                    if (newVal == 2 || newVal === 2) {
                        vehicleRegNo.setVisible(true);
                        vehicleRegNo.allowBlank = false;
                        vehicleRegNo.validate();
                    } else {
                        vehicleRegNo.reset();
                        vehicleRegNo.setVisible(false);
                        vehicleRegNo.allowBlank = true;
                        vehicleRegNo.validate();
                    }
                }
            }
        },
        {
            xtype: 'textfield',
            name: 'vehicle_reg_no',
            fieldLabel: 'Vehicle Reg No',
            hidden: true,
            allowBlank: true
        }, 
       
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            //store: 'countriesstr',
            forceSelection: true,
            value:36,
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
            fieldLabel: 'Telephone',
            name: 'telephone'
        },
        
        {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'email'
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
            valueField: 'id',
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
                    isLoad: true
                }
            }
        }
    ],
    buttons:[{
        text:'Save New Premises Details',
        iconCls:'fa fa-plus',
        ui:'soft-green',
        storeId:'inspectionpremiseselectionstr',
        action_url: 'premiseregistration/funcAddNewPremisesDetails',
        handler:'funcAddNewPremisesDetails'
    }]
});