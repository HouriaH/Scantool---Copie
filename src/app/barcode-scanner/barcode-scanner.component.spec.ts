import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BarcodeScannerComponent} from './barcode-scanner.component';
import Quagga, {QuaggaJSConfigObject} from 'quagga';

describe('BarcodeScannerComponent', () => {
  let component: BarcodeScannerComponent;
  let fixture: ComponentFixture<BarcodeScannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarcodeScannerComponent]
    }).compileComponents();
  });

  describe('Camera unavailable', () => {
    beforeEach(() => {
      spyOn(Quagga.CameraAccess, 'request').and.callFake(() => Promise.reject('Permission denied'));

      fixture = TestBed.createComponent(BarcodeScannerComponent);
      component = fixture.componentInstance;

    });

    it('should report error', (done) => {
      fixture.detectChanges();
      expect(Quagga.CameraAccess.request).toHaveBeenCalled();
      component.exception.subscribe((err) => {
        expect(err).toBeDefined();
        expect(err).toBe('Permission denied');
        done();
      });
    });

    it('should setup config', () => {
      const config: QuaggaJSConfigObject = {
        inputStream: {
          constraints: {
            deviceId: '123123',
            facingMode: 'environment',
            width: {min: 300},
            height: {min: 300},
            noiseSuppression: true,
            aspectRatio: {min: 1, max: 100},
          }
        },
      };
      component.config = config;
      component.codes = ['ean_8'];
      fixture.detectChanges();

      expect(component.config).toEqual({
        locate: true,
        numOfWorkers: 8,
        frequency: 10,
        decoder: {
          readers: ['ean_8_reader']
        },
        locator: {
          patchSize: 'medium',
          halfSample: false
        },
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          constraints: {
            deviceId: '123123',
            facingMode: 'environment',
            width: {min: 300},
            height: {min: 300},
            noiseSuppression: true,
            aspectRatio: {min: 1, max: 100},
          }
        }
      });

    });
  });

  describe('Camera available', () => {
   xit('should scan a barcode');
 });
});
