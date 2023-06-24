Ext.define('Admin.view.surveillance.views.forms.NewPmsPremiseFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'newpmspremisefrm',
    frame: true,
    margin: 3,
    layout: 'column',
    controller: 'surveillancevctr',
    defaults: {
        labelAlign: 'top',
        margin: 5,
        columnWidth: 0.3
    },
    items: [{
    	xtype: 'hiddenfield',
    	name: 'id'
    },{
    	xtype: 'hiddenfield',
    	name: 'section_id'
    },
	        {
	            xtype: 'textfield',
	            name: 'name',
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
	                    fn: 'setSurveillanceCombosStore',
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
	        // {
	        //     xtype: 'combo',
	        //     fieldLabel: 'Device Type',
	        //     name: 'device_type_id',
	        //     hidden: true,
	        //     forceSelection: true,
	        //     allowBlank: true,
	        //     queryMode: 'local',
	        //     valueField: 'id',
	        //     displayField: 'name',
	        //     listeners: {
	        //         beforerender: {
	        //             fn: 'setSurveillanceCombosStore',
	        //             config: {
	        //                 pageSize: 10000,
	        //                 proxy: {
	        //                     url: 'commonparam/getCommonParamFromTable',
	        //                     extraParams: {
	        //                         table_name: 'par_device_types'
	        //                     }
	        //                 }
	        //             },
	        //             isLoad: true
	        //         }
	        //     }
	        // },
	        {
	            xtype: 'combo',
	            fieldLabel: 'Country',
	            name: 'country_id',
	            //store: 'countriesstr',
	            forceSelection: true,
	            queryMode: 'local',
	            valueField: 'id',
	            displayField: 'name',
	            listeners: {
	                beforerender: {
	                    fn: 'setSurveillanceCombosStore',
	                    config: {
	                        pageSize: 10000,
	                        proxy: {
		                        url: 'commonparam/getCommonParamFromTable',
		                        extraParams: {
		                            table_name: 'par_countries'
		                        }
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
	                    fn: 'setSurveillanceCombosStore',
	                    config: {
	                        pageSize: 10000,
	                        proxy: {
		                        url: 'commonparam/getCommonParamFromTable',
		                        extraParams: {
		                            table_name: 'par_regions'
		                        }
		                    }
	                    },
	                    isLoad: true
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
	                    fn: 'setSurveillanceCombosStore',
	                    config: {
	                        pageSize: 10000,
	                        proxy: {
		                        url: 'commonparam/getCommonParamFromTable',
		                        extraParams: {
		                            table_name: 'par_districts'
		                        }
		                    }
	                    },
	                    isLoad: false
	                }
	            }
	        },
	        {
	            xtype: 'textfield',
	            fieldLabel: 'Street',
	            name: 'street',
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
	            name: 'fax',
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
	        }],
	    buttons: [
	        {
	            xtype: 'button',
	            text: 'Save Details',
	            ui: 'soft-purple',
	            iconCls: 'x-fa fa-save',
	            store: 'PmspremiseSelectionStr',
	            formBind: true,
	            handler: 'doSaveNewPmsPremise',
	        }
	    ],
});