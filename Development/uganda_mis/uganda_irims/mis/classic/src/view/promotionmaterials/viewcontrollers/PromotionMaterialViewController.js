-Ext.define('Admin.view.promotionmaterials.viewcontrollers.PromotionMaterialViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.promotionmaterialviewcontroller',

    init: function () {

    },
	
    editpreviewPermitQueryinformation: function (grid,record) {
        this.fireEvent('editpreviewPromotionalQueryinformation', grid,record);
    },
    //
	showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },
	applicantAsSponsorHandler:function(combo,value)
	{
		var btn=combo.up('form').down('button[name=link_applicant]');
		 //btn.enable (true);
		//btn.disable(false);
		
	},
    onSelectionChangeAdvertseimentsTypes:function(cbo, value){
        var form = cbo.up('form');
            if(value == 2){
               var isVisible = true;
                
               form.down('tagfield[name=meeting_types_id]').setVisible(true);

            }else{
                var isVisible = false;
                
                form.down('tagfield[name=meeting_types_id]').setVisible(false);
            }

            form.down('datefield[name=exhibition_start_date]').setVisible(isVisible);
            form.down('datefield[name=exhibition_end_date]').setVisible(isVisible);
           
            form.down('textarea[name=other_promotion_meetingtype]').setVisible(isVisible);
            form.down('textfield[name=venue_of_exhibition]').setVisible(isVisible);
            form.down('textarea[name=physicaladdress_of_exhibition]').setVisible(isVisible);
            form.down('textarea[name=promotionameeting_other_information]').setVisible(isVisible);
            form.down('textfield[name=events_responsible_person]').setVisible(isVisible);
            form.down('textfield[name=responsible_persons_physicaladdress]').setVisible(isVisible);
            form.down('textfield[name=responsible_persons_contacts]').setVisible(isVisible);
            
    },
    showAddProductUnstructuredQueriesWin: function (btn) {
  
        var me = this,
        childXtype = btn.childXtype,
        winTitle = btn.winTitle,
        winWidth = btn.winWidth,
        isWin = btn.isWin,
        child = Ext.widget(childXtype),
        mainTabPnl = btn.up('#contentPanel'),
        containerPnl = mainTabPnl.getActiveTab(),
        application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
        module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
        sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
        section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
        workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
        reference_no = containerPnl.down('displayfield[name=reference_no]').getValue(),
        tracking_no = containerPnl.down('displayfield[name=tracking_no]').getValue();
        
        child.setHeight(600);
   
    funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
   
    child.down('hiddenfield[name=application_code]').setValue(application_code);
    child.down('hiddenfield[name=section_id]').setValue(section_id);
    child.down('hiddenfield[name=module_id]').setValue(module_id);
    //child.down('hiddenfield[name=product_id]').setValue(product_id);
    child.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
    
    child.down('displayfield[name=tracking_no]').setValue(tracking_no);
    child.down('displayfield[name=reference_no]').setValue(reference_no);


    }, quickNavigationonlineprev:function(btn){
       
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            sub_module_id = motherPnl.down('hiddenfield[name=sub_module_id]').getValue(),
            status_type_id = motherPnl.down('hiddenfield[name=status_type_id]').getValue(),
            progressItems = progress.items.items;
            
            max_step =3;

        if (step == 0) {
           
        } else {
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step === max_step) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
        }
       
        if (step === 0) {
           
            wizardPnl.down('button[name=submit_btn]').setVisible(false);
            
            
            wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
            
            wizardPnl.getViewModel().set('atBeginning', true);
            wizardPnl.getViewModel().set('atEnd', false);
            
        }else if(step == 1){
     
        } else if (step === max_step) {
           
            wizardPnl.down('button[name=submit_btn]').setVisible(true);
           
            wizardPnl.down('button[name=save_screening_btn]').setVisible(true);

            wizardPnl.getViewModel().set('atBeginning', false);
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
           
            
            wizardPnl.down('button[name=submit_btn]').setVisible(false);
           
            wizardPnl.down('button[name=save_screening_btn]').setVisible(false);

          
            wizardPnl.getViewModel().set('atEnd', false);
            
            wizardPnl.getViewModel().set('atBeginning', false);
        }

        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();
        //activeIndex = wizardPnl.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
       
        activeItem.focus();
    }, setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },
    
    onPrevCardClickOnline: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atEnd', false);
        this.navigateOnlineTabs(btn, wizardPnl, 'prev');
    },
    onNextCardClickOnline: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard);
            wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateOnlineTabs(btn, wizardPnl, 'next');

    },
    navigateOnlineTabs: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            
            win = button.up('window'),
            
            status_type_id = win.down('hiddenfield[name=status_type_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            model = wizardPanel.getViewModel(),
            item, i, activeItem, activeIndex;
            console.log(layout);
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);
        if(sub_module_id == 9){
                max_step = 4;
        }
        else{
            max_step =3;
        }
        // beginning disables previous
        if (activeIndex === 0) {
            
            
            wizardPanel.down('button[name=submit_btn]').setVisible(false);
            
           
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            model.set('atBeginning', true);
        }else if (activeIndex === 1) {
           
        } else if (activeIndex === max_step) {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
           
            wizardPanel.down('button[name=save_screening_btn]').setVisible(true);
            
            model.set('atBeginning', false);
            model.set('atEnd', true);
        } else {
            
            wizardPanel.down('button[name=submit_btn]').setVisible(true);
           
            wizardPanel.down('button[name=save_screening_btn]').setVisible(false);
            

            model.set('atBeginning', false);
           
        }
        
        if (activeIndex === max_step) {
            
            model.set('atEnd', true);

        } else {
           
            model.set('atEnd', false);
        }
    },
		
	reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },

	showPromotionAdvertsRegWorkflow: function (obj, options) {
        this.fireEvent('showPromotionAdvertsRegWorkflow', obj, options);
    },	
	
	setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
	
	workflowStagesLoad: function (obj, options) {
		//alert();
        this.fireEvent('workflowStagesLoad', obj, options);
    },
	
	

	custStoreConfig: function (obj, options) {
        this.fireEvent('custStoreConfig', obj, options);
    },
	 setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },
	
	
	showPromotionAndAdvertMaterialWorkflow: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('showPromotionAndAdvertMaterialWorkflow', application_type);
    },
   
    	
	onNewPromotionMaterials: function (btn) {
		
        var application_type = btn.app_type,section_id=btn.section_id,xtypeWrapper=btn.xtypeWrapper;
	
        this.fireEvent('onNewPromotionMaterials', application_type,section_id,xtypeWrapper);
    },
	
	 quickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            max_step = btn.max_step,
			motherPnl = wizardPnl,
            application_id =motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items; 

        if (step > 0) {
            var thisItem = progressItems[step];
             if (!application_id) {
                thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            } 
        }
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', false);
        } else {
		    wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', false);
        }
		

        if (step === max_step) {
          
		    wizardPnl.down('button[name=process_submission_btn]').setVisible(true);
            motherPnl.getViewModel().set('atEnd', true);

        } else {
		    wizardPnl.down('button[name=save_btn]').setVisible(true);
           
		    wizardPnl.down('button[name=process_submission_btn]').setVisible(false);
            motherPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
	
	    setConfigCombosSectionfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },
	
	showPromotionMaterialProductForm: function (btn) {
        var form = Ext.widget('productparticularandingredientspanel'),
		product_id=form.product_id,
		up_form=form.down('promotionmaterialproductparticularsform');
		//down_grid=form.down('productingredientsstrengthgrid'),
		//btn=down_grid.down('button[name=add]'),//promotionmaterialproductparticularsform
		//store=down_grid.getStore();
		
		
	   
		//store.removeAll();
       // store.load({params:{active_application_id:product_id}});
		
		
        funcShowCustomizableWindow('Product Particulars', '75%', form, 'customizablewindow');
    },
	
	editPromotionMaterialProductForm: function (item) {
        var form = Ext.widget('productparticularandingredientspanel'),
		promotionmaterialproductparticularsform=form.down('promotionmaterialproductparticularsform'),
		productingredientsstrengthgrid=form.down('productingredientsstrengthgrid'),
		 is_read_only=item.up('grid').up('panel').down('hiddenfield[name=is_read_only]').getValue(),
		    btn = item.up('button'),record = btn.getWidgetRecord();
		form.down('button[name=add]').enable();
		form.down('form').loadRecord(record);
		form.product_id=record.get('id'),
		store=form.down('grid').getStore();
		
	
		// console.log( productingredientsstrengthgrid.columns[3]);
		 
		
		
		if(is_read_only==1 || is_read_only===1 ){
			productingredientsstrengthgrid.down('button[name=add]').setDisabled(true);
			productingredientsstrengthgrid.columns[4].setHidden(true)
		    applyReadOnlytoForms(promotionmaterialproductparticularsform);
		}
	

		store.removeAll();
        store.load({params:{active_application_id:record.get('id')}});
        funcShowCustomizableWindow('Edit Product Particulars', '75%', form, 'customizablewindow');
    },
	
	editPromotionMaterialDetails: function (item) {
        var form = Ext.widget('promotionmaterialdetailsform'),
		    btn = item.up('button'),record = btn.getWidgetRecord();
		
		form.loadRecord(record);
        funcShowCustomizableWindow('Edit Promotion Material Details', '30%', form, 'customizablewindow');
    },
	
	deleteRecordAdvanced: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.up('grid').getStore(),
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
      
    }, 
	
	deleteRecord: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
		
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
      
    },
	deleteRecordFromIDComplex:function (item) {
		
		
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
			 record = btn.getWidgetRecord(),
		    id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
			
        this.fireEvent('deleteRecordFromIDComplex', id, table_name, storeID, url,'POST',record);
      
    },
	deleteRecordSingleParam:function (item) {
	
        var me = this,
            btn = item.up('button'),
			 record = btn.getWidgetRecord(),
		    id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
			console.log(record);
			
        this.fireEvent('deleteRecordSingleParam', id, table_name, storeID, url,'POST',record);
      
    },
	
	
	genericGridShowWin:function (btn) {
		    var 
			title = btn.winTitle,
			childXtype=btn.childXtype,
			winWidth=btn.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
			arrayLength = storeArray.length,
			panel=btn.up('panel');
			
			
           // filter = "section_id:" + section_id;
         funcShowCustomizableWindowWithObject(title, winWidth, form, 'customizablewindow',panel);
        //funcShowCustomizableWindow(title, winWidth, form, 'customizablewindow');
	},
	genericGridEditWin: function (item) {
       
		var btn=item.up('button'),
		   record = btn.getWidgetRecord(),
			title = item.winTitle,
			childXtype=item.childXtype,
			winWidth=item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
			grid=btn.up('grid'),
			panel=btn.up('grid').up('panel');
			//product_id=panel.product_id,
			//store=grid.getStore();
			
			form.loadRecord(record);
			
	
		funcShowCustomizableWindowWithObject(title, winWidth, form, 'customizablewindow',grid);
		
       // funcShowCustomizableWindow(title, winWidth, form, 'customizablewindow');
    },
	
	showPromotionMaterialDetailsForm: function (btn) {
        var me = this,
            grid = btn.up('grid'),
            win = grid.up('window'),
            //premise_id = win.down('hiddenfield[name=premise_id]').getValue(),
            section_id =2 ,//win.down('hiddenfield[name=section_id]').getValue(),
			
           // application_id = win.down('hiddenfield[name=application_id]').getValue(),
			
            title = btn.winTitle,
            form = Ext.widget('promotionmaterialdetailsform'),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length,
            filter = "section_id:" + section_id;
  
        funcShowCustomizableWindow(title, '30%', form, 'customizablewindow');
    },
	
	
    showApplicantSelectionList: function (btn) {
        var grid = Ext.widget('applicantpromotionmaterialselectiongrid');
		
		//console.log(grid.for_applicant_details);
		
        if (btn.applicantType == 'local') {
            grid.applicantType = btn.applicantType;
        } else {
            grid.applicantType = 'nonlocal';
        }
		
        funcShowCustomizableWindow('Applicant Selection List', '90%', grid, 'customizablewindow');
    },
	showSponsorSelectionList: function (btn) {
        var grid = Ext.widget('sponsorsgrid');
		
		grid.for_applicant_details=0;
		
        if (btn.applicantType == 'local') {
            grid.applicantType = btn.applicantType;
        } else {
            grid.applicantType = 'nonlocal';
        }
        funcShowCustomizableWindow('Sponosr Selection List', '90%', grid, 'customizablewindow');
    },
	showRegistererdProductSelectionList: function (btn) {
	
        var grid = Ext.widget('promotionandadvertsregisteredproductsdetailsgrid'),
		form=btn.up('form');
	
	
        funcShowCustomizableWindowWithObject('Registered Product Selection List', '90%', grid, 'customizablewindow',form);
    }, 
	
	
	
	
	
	
	 onDoubleClickPromotionMaterialsDashBoardGrid: function (grid, record) {
		 
		this.fireEvent('viewPromotionMaterials',grid, record);

    },
	
	
	showEditWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },
	


	    //Receiving Wizard starts
    onPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
			motherPnl = wizardPnl;
            //motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
			motherPnl = wizardPnl;
           // motherPnl = wizardPnl.up('panel');
		   
		 motherPnl.getViewModel().set('atBeginning', true);  
		var application_id =motherPnl.down('hiddenfield[name=active_application_id]').getValue();
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items; 

             if (!application_id) {
               // thisItem.setPressed(false);
                toastr.warning('Please save application details first!!', 'Warning Response');
                return false;
            }else{
				this.navigate(btn, wizardPnl, 'next');
			}
       
		       
        
    },

    navigate: function (button, wizardPanel, direction) {
		
		
		var layout = wizardPanel.getLayout(),
        
            max_step = button.max_step,
            progress = this.lookupReference('progress'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', true);

        } else {
            wizardPanel.down('button[name=save_btn]').setDisabled(true);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);

            model.set('atBeginning', false);
        }
		
        if (activeIndex === max_step) {
            model.set('atBeginning', false);
            wizardPanel.down('button[name=process_submission_btn]').setVisible(true);
            model.set('atEnd', true);
        } else {
            wizardPanel.down('button[name=process_submission_btn]').setVisible(false);
            
            model.set('atBeginning', false);
            model.set('atEnd', false);
        }

    },
	
	
	
	
	saveApplicantDetails:function(btn)
	{
		
		this.fireEvent('saveApplicantDetails',btn);
	},
	setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
	
    setPromotionMaterialOnlineGridsStore: function (me, options) {
		
        var config = options.config,
		
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.premiseRegistration.PremiseRegGridAbstractStore', config);
			
		
		me.setStore(store);
		
        toolbar.setStore(store);
		
	
		
        if (isLoad === true || isLoad == true) {
			
            store.removeAll();
		    store.load(config);
        } 
    },
	
    previewproductApplicationQueries: function (item) {
        this.fireEvent('showApplicationQueries', item);
    },
    setPromotionMaterialGridsStore: function (obj, options) {
        this.fireEvent('setPromotionMaterialGridsStore', obj, options);
    },
	 setCustomPromotionMaterialGridsStore: function (obj, options) {
        this.fireEvent('setCustomPromotionMaterialGridsStore', obj, options);
    },
	printManagersReport: function (item) {
        var report_type = item.report_type,
            action_url = base_url + '/premiseregistration/getManagersReports?report_type=' + report_type;
        print_report(action_url);
    },
    showPreviousUploadedDocs: function (item) {
        this.fireEvent('showPreviousUploadedDocs', item);
    },
     showInspectionDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            winTitle = item.winTitle,
            winWidth = item.winWidth,
            childItem = Ext.widget(item.childXtype),
            form = childItem.down('form');
        Ext.getBody().mask('Please wait...');
        Ext.Ajax.request({
            method: 'GET',
            url: 'premiseregistration/getInspectionDetails',
            params: {
                application_id: application_id,
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results;
                if (success == true || success === true) {
                    if (results) {
                        var model = Ext.create('Ext.data.Model', results);
                        form.loadRecord(model);
                    }
                    funcShowCustomizableWindow(winTitle, winWidth, childItem, 'customizablewindow');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
	showPromotionAndAdvertApplicationMoreDetails: function (item) {

		
        Ext.getBody().mask('Please wait...');
        var btn = item.up('button'),
            record = btn.getWidgetRecord();
        this.fireEvent('showApplicationMoreDetails', record/* ,application_id, premise_id, applicant_id, ref_no, process_id, workflow_stage_id, module_id, sub_module_id, section_id, isReadOnly, is_temporal */);
    },
    // Receiving wizard ends
	
	
    showPromotionAndAdvertsApplicationMoreDetailsOnDblClick: function (item) {
        var btn = item.up('button'),
         record = btn.getWidgetRecord();
        this.fireEvent('customShowApplicationMoreDetailsGeneric', record);
    },

	
    showPreviousComments: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code');
        this.fireEvent('showApplicationCommentsWin', item, application_id, application_code);
    },
	printPromotionalRegCertificate: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_code = record.get('application_code');
        this.fireEvent('generatePromotionalRegCertificate', application_code);
    }, getBatchApplicationApprovalDetails: function (btn) {

        this.fireEvent('getPromotionBatchApplicationApprovalDetails', btn);
    },
	
	generatePromotionalRegCertificate: function (item) {
        var record = item.getWidgetRecord(),
        application_code = record.get('application_code');
        this.fireEvent('generatePromotionalRegCertificate', application_code);
        
    },
	onViewApprovalApplicationDetails: function (item) {
        var btn = item.up('button'),
            interfaceXtype = item.interfaceXtype,
            record = btn.getWidgetRecord();
        this.fireEvent('viewApplicationMoreDetails', record, interfaceXtype);
    },

	
	
  getApplicationApprovalDetails: function (item) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_update = item.is_update,
            isAlt = item.isAlt,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            application_id = record.get('active_application_id'),
            application_code = record.get('application_code'),
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            table_name = item.table_name,
            form = Ext.widget('promoapprovalrecommendationfrm'),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.setController('premiseregistrationvctr');
        if ((isAlt) && (isAlt == 1 || isAlt === 1)) {
            form.down('textfield[name=permit_no]').setVisible(false);
            form.down('datefield[name=expiry_date]').setVisible(false);
            form.down('datefield[name=expiry_date]').allowBlank = true;
            form.down('datefield[name=expiry_date]').validate();
            form.down('datefield[name=approval_date]').setVisible(false);
            form.down('datefield[name=approval_date]').allowBlank = true;
            form.down('datefield[name=approval_date]').validate();
        }
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        if (is_update > 0) {
            form.down('combo[name=decision_id]').setReadOnly(true);
            form.down('datefield[name=approval_date]').setReadOnly(true);
          
            form.down('textarea[name=comment]').setReadOnly(true);
            form.down('button[name=save_recommendation]').setText('Update Recommendation');
        }
        form.down('datefield[name=expiry_date]').setReadOnly(true);
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        Ext.Ajax.request({
            method: 'GET',
            url: 'getApplicationApprovalDetails',
            params: {
                application_id: application_id,
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    success = resp.success,
                    message = resp.message,
                    results = resp.results,
                    model = Ext.create('Ext.data.Model', results);
                if (success == true || success === true) {
                    form.loadRecord(model);
                    form.down('hiddenfield[name=application_id]').setValue(application_id);
                    form.down('hiddenfield[name=application_code]').setValue(application_code);
                    form.down('hiddenfield[name=process_id]').setValue(process_id);
                    form.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
                    funcShowCustomizableWindow('Approval Recommendation', '40%', form, 'customizablewindow');
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },
	
	
	quickNavigationMoreDetails: function (btn) {
        var step = btn.step,
            wizardPnl = btn.up('panel'),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
        if (step == 0) {
            //wizardPnl.down('button[name=save_btn]').setDisabled(true);
            wizardPnl.getViewModel().set('atBeginning', true);
        } else {
            //wizardPnl.down('button[name=save_btn]').setDisabled(false);
            wizardPnl.getViewModel().set('atBeginning', false);
        }
        if (step == 3) {
            wizardPnl.getViewModel().set('atEnd', true);
        } else {
            wizardPnl.getViewModel().set('atEnd', false);
        }
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();
        //activeIndex = wizardPnl.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
	 onPrevCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atEnd', false);
        this.navigateMoreDetails(btn, wizardPnl, 'prev');
    },

    onNextCardClickMoreDetails: function (btn) {
        var wizardPnl = btn.up('panel');
        wizardPnl.getViewModel().set('atBeginning', false);
        this.navigateMoreDetails(btn, wizardPnl, 'next');
    },

    navigateMoreDetails: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            model = wizardPanel.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;
        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = wizardPanel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            //wizardPanel.down('button[name=save_btn]').setDisabled(true);
            model.set('atBeginning', true);
        } else {
            //wizardPanel.down('button[name=save_btn]').setDisabled(false);
            model.set('atBeginning', false);
        }
        if (activeIndex === 3) {
            model.set('atEnd', true);
        } else {
            model.set('atEnd', false);
        }
    },
	
    showApplicationChecklists: function (item) {
        this.fireEvent('showApplicationChecklists', item);
    },
	showAddOverallCommentsRegParamWinFrm: function (btn) {
	
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle = btn.winTitle,
            winWidth = btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;

        
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
	   
	 
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
    },
	


  showAddApplicationEvaluationComment: function (btn) {
        btn.setDisabled(true);
        var grid = btn.up('grid'),
            panel = grid.up('panel'),
            form = panel.down('form');
        form.setVisible(true);
    },
    showEditApplicationEvaluationComment: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            grid = btn.up('grid'),
            panel = grid.up('panel'),
            form = panel.down('form'),
            add_btn = grid.down('button[name=add_btn]');
        form.loadRecord(record);
        form.setVisible(true);
        add_btn.setDisabled(true);
    },
    cancelAddApplicationEvaluationComment: function (btn) {
        var form = btn.up('form'),
            panel = form.up('panel'),
            grid = panel.down('grid'),
            add_btn = grid.down('button[name=add_btn]');
        form.setVisible(false);
        add_btn.setDisabled(false);
    },

   setPromAdvertsRegGridsStore: function (obj, options) {
		this.fireEvent('setPromAdvertsRegGridsStore', obj, options);
    },
	
    showAddSponsorForm: function (btn) {
        var form = Ext.widget('sponsorform'),
		storeID=btn.up('grid').getStore();

        //funcShowCustomizableWindow('Sponsor Details', '65%', form, 'customizablewindow');
		funcShowCustomizableWindowWithObject('Sponsor Details', '65%', form, 'customizablewindow',storeID);
    },
	
	editSponsorsForm: function (item) {
        var form = Ext.widget('sponsorform'),
		  btn = item.up('button'),record = btn.getWidgetRecord(),
		  storeID=item.up('grid').getStore();
		form.loadRecord(record);
		funcShowCustomizableWindowWithObject('Edit Sponsor Details', '65%', form, 'customizablewindow',storeID);
        //funcShowCustomizableWindow('Edit Sponosr Details', '65%', form, 'customizablewindow');
    },
	
	
	
	
	queryOnlineApplicationFrmBtn: function (btn) {
        var win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            application_status = win.down('hiddenfield[name=application_status_id]').getValue(),
            queriesGrid = Ext.widget('onlinequeriesgrid');
        queriesGrid.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        queriesGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        if (application_status == 17 || application_status === 17) {
            queriesGrid.down('button[action=add_query]').setVisible(false);
            queriesGrid.down('button[action=submit_app]').setVisible(false);
            queriesGrid.down('hiddenfield[name=isReadOnly]').setValue(1);
        }
        funcShowCustomizableWindow(tracking_no + ' - Queries', '55%', queriesGrid, 'customizablewindow');
    },

    onAddOnlineQuery: function (btn) {
        var grid = btn.up('grid'),
            win = grid.up('window'),
            application_id = grid.down('hiddenfield[name=application_id]').getValue(),
            application_code = grid.down('hiddenfield[name=application_code]').getValue(),
            queriesFrm = Ext.widget('onlinequeriesfrm'),
            gridHeight = grid.getHeight();
        queriesFrm.down('hiddenfield[name=application_id]').setValue(application_id);
        queriesFrm.down('hiddenfield[name=application_code]').setValue(application_code);
        queriesFrm.setHeight(gridHeight);
        grid.hide();
        win.add(queriesFrm);
    },
	
	
	
	submitRejectedOnlineApplicationFrmBtn: function (btn) {
	 var action_url = 'submitRejectedOnlineApplication',
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            table_name = 'wb_promotion_adverts_applications';
        btn.fireEvent('submitApplication', application_id, application_code, action_url, table_name);
    },
	
   receiveOnlineApplicationDetailsFrmBtn: function (btn) {
        Ext.getBody().mask('Please wait...');
        var storeID = btn.storeID,
            winWidth = btn.winWidth,
            win = btn.up('window'),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            tracking_no = win.down('displayfield[name=tracking_no]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = win.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = win.down('hiddenfield[name=section_id]').getValue(),
            is_manager_query = 0;
        showOnlineSubmissionWin(application_id, module_id, sub_module_id, section_id, 'onlinesubmissionsfrm', winWidth, storeID, tracking_no, is_manager_query);
    },
	
 previewOnlineApplication: function (view, record) {
        var grid = view.grid,
            isRejection = grid.isRejection,
            isReadOnly = grid.isReadOnly,
            status_id = record.get('application_status_id'),
            status_name = record.get('application_status'),
            tracking_no = record.get('tracking_no'),
            application_id = record.get('active_application_id'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            section_id = record.get('section_id'),
            application_code = record.get('application_code'),
            application_status_id = record.get('application_status_id'),
            onlinePanel = Ext.widget('promoadvertsonlinepreviewpanel'),
            wizardPnl = onlinePanel.down('promoadvertonlinepreviewwizard');
            //docsGrid = onlinePanel.down('premregonlinedocuploadsgenericgrid'),
            //premisePersonnelGrid = wizardPnl.down('premisepersonneldetailsgrid');
        if (status_id == 23 && isRejection != 1) {
            toastr.warning('Action not allowed for application in this status [' + status_name + '] ', 'Warning Response');
            return false;
        }
        if (isRejection == 1) {
            wizardPnl.down('button[name=prev_rejections]').setVisible(true);
            wizardPnl.down('button[name=actions]').setVisible(true);
            wizardPnl.down('button[name=receive_btn]').setVisible(false);
            wizardPnl.down('button[name=query_btn]').setVisible(false);
            wizardPnl.down('button[name=reject_btn]').setVisible(false);
        }
        /* docsGrid.down('hiddenfield[name=application_code]').setValue(application_code);
        docsGrid.down('hiddenfield[name=section_id]').setValue(section_id);
        docsGrid.down('hiddenfield[name=module_id]').setValue(module_id);
        docsGrid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id) */;
        onlinePanel.down('hiddenfield[name=active_application_id]').setValue(application_id);
        onlinePanel.down('hiddenfield[name=active_application_code]').setValue(application_code);
        onlinePanel.down('hiddenfield[name=module_id]').setValue(module_id);
        onlinePanel.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        onlinePanel.down('hiddenfield[name=section_id]').setValue(section_id);
        onlinePanel.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        //onlinePanel.down('button[action=link_applicant]').setDisabled(true);
        //onlinePanel.down('premisedetailsfrm').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
/*         premisePersonnelGrid.down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        premisePersonnelGrid.setIsWin(1); */
        //wizardPnl.down('personnelqualificationsgrid').down('hiddenfield[name=isReadOnly]').setValue(isReadOnly);
        //wizardPnl.down('premisecontactpersonfrm').down('button[action=link_personnel]').setDisabled(true);
        //wizardPnl.down('premisesuperintendentfrm').down('button[action=link_personnel]').setDisabled(true);
        funcShowCustomizableWindow(tracking_no, '80%', onlinePanel, 'customizablewindow');
    },
    showregisteredApplicationDetailsSearch: function (btn) {
        //
        var mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab(),
            application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            is_populate_primaryappdata = 0,
            status_id = '',
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue();
            if(containerPnl.down('hiddenfield[name=is_populate_primaryappdata]')){
                is_populate_primaryappdata =  containerPnl.down('hiddenfield[name=is_populate_primaryappdata]').getValue();
            }
            if(containerPnl.down('hiddenfield[name=status_id]')){
                 status_id =  containerPnl.down('hiddenfield[name=status_id]').getValue();
            }
        if (!application_id || is_populate_primaryappdata == 1){
            var me = this,
                childXtype = btn.childXtype,
                winTitle = btn.winTitle,
                winWidth = btn.winWidth,
                grid = Ext.widget(childXtype);

                grid.height= 550;
                grid.down('hiddenfield[name=section_id]').setValue(section_id);
                if(grid.down('hiddenfield[name=status_id]')){
                    grid.down('hiddenfield[name=status_id]').setValue(status_id);
                }
             funcShowCustomizableWindow(winTitle, winWidth, grid, 'customizablewindow');
            
        }
        else {
            toastr.error('Alert: ', 'Application has already been saved, update the details to continue');
        }

    }, funcClearSearchApplications: function (btn) {
        var grid = btn.up('grid'),
            store = grid.store;
        grid.down('textfield[name=search_value]').setValue(''),
            search_field = grid.down('combo[name=search_field]').setValue('');

            store.removeAll();
        store.load();

    },
    funcPrevGridApplicationDocuments: function (item) {
        this.fireEvent('funcPrevGridApplicationDocuments', item);
    }, funcSearchProductApplications: function (btn) {
        var grid = btn.up('grid'),
            store = grid.store,
            search_value = grid.down('textfield[name=search_value]').getValue(),
            search_field = grid.down('combo[name=search_field]').getValue();
        if (search_field != '') {
            store.removeAll();
            store.load({ params: { search_value: search_value, search_field: search_field } })
        }
    },
});